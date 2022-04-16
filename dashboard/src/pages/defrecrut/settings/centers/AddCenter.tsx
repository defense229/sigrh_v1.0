import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../../../components/Buttons/Button';
import LabeledCheckbox from '../../../../components/Checkbox/LabeledCheckbox';
import Select from '../../../../components/Dropdowns/Select';
import Input from '../../../../components/Inputs/Input';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import Flex from '../../../../components/Utils/Flex/Flex';
import Condition from '../../../../components/Utils/Others/Condition';
import { config } from '../../../../env';
import { useFetch } from '../../../../services/hooks/useFetch';

export interface IRadioType {
  unique: boolean;
  double: boolean;
}

export interface ICenter {
  id?: string;
  departement1?: string;
  departement2?: string;
  departement?: string;
  centers: number;
  rooms: number;
  candidates: number;
  exam?: string;
}

type Props = {
  onClose: () => void;
  center?: ICenter | null;
};

function AddCenter({ onClose = () => {}, center = null }: Props) {
  const { id } = useParams();
  const [type, setType] = useState({ unique: true, double: false });
  const [center_, setCenter] = useState<ICenter>(
    center
      ? center
      : {
          departement1: '',
          departement2: '',
          centers: 1,
          rooms: 0,
          candidates: 30,
          exam: id,
        }
  );
  const [loading, departements] = useFetch({
    url: config.api_url.sigrh + 'departements/exam/' + id,
  });
  const [hasError, setHasError] = useState(false);

  const toggleChange = () => {
    setCenter((center: ICenter) => ({
      ...center,
      departement1: '',
      departement2: '',
    }));
    setType((prev: IRadioType) => ({
      unique: !prev.unique,
      double: !prev.double,
    }));
  };

  const handleSubmit = async ($event: any) => {
    $event.preventDefault();
    if (center_.departement1 === '') {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    } else {
      const payload = { ...center_ };
      delete payload.departement1;
      delete payload.departement2;
      payload.departement = type.unique
        ? center_.departement1
        : `${center_.departement1}-${center_.departement2}`;

      if (!center) {
        await axios.post(config.api_url.sigrh + 'centers', payload);
      } else {
        await axios.put(config.api_url.sigrh + 'centers/' + center.id, payload);
      }
      onClose();
    }
  };

  if (loading) return <ComponentLoading />;

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="col" gap="15px">
        <div>
          {hasError ? (
            <div className="text-danger bold">
              Veuillez sélectionnner un département
            </div>
          ) : (
            ''
          )}
        </div>
        <div>
          <LabeledCheckbox
            onChange={toggleChange}
            checked={type.unique}
            type="radio"
          >
            Département unique
          </LabeledCheckbox>

          <LabeledCheckbox
            onChange={toggleChange}
            checked={type.double}
            type="radio"
          >
            Département double
          </LabeledCheckbox>
        </div>

        <div className="w-full">
          <Condition cond={type.unique}>
            <Select
              display="label"
              values={departements}
              required
              label="Département"
              onChange={(value: any) =>
                setCenter((c: ICenter) => ({ ...c, departement1: value.label }))
              }
            />
          </Condition>

          <Condition cond={type.double}>
            <div className="grid grid-cols-2 gap-20">
              <Select
                display="label"
                values={departements}
                required
                label="Département 1"
                onChange={(value: any) =>
                  setCenter((c: ICenter) => ({
                    ...c,
                    departement1: value.label,
                  }))
                }
              />
              <Select
                display="label"
                values={departements}
                required
                label="Département 2"
                onChange={(value: any) =>
                  setCenter((c: ICenter) => ({
                    ...c,
                    departement2: value.label,
                  }))
                }
              />
            </div>
          </Condition>
        </div>

        <Input
          value={center_.centers}
          onChange={($event) =>
            setCenter((c) => ({ ...c, centers: Number($event.target.value) }))
          }
          type="number"
          label="Nombre de centre"
          required
        />
        <Input
          value={center_.rooms}
          onChange={($event) =>
            setCenter((c) => ({ ...c, rooms: Number($event.target.value) }))
          }
          type="number"
          label="Nombre de salles par centre"
          required
        />
        <Input
          value={center_.candidates}
          onChange={($event) =>
            setCenter((c) => ({
              ...c,
              candidates: Number($event.target.value),
            }))
          }
          type="number"
          label="Nombre de candidats par salle"
          required
        />

        <Button expand>Valider</Button>
      </Flex>
    </form>
  );
}

export default AddCenter;
