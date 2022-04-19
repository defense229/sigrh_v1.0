import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import Button from '../../../../components/Buttons/Button';
import Select from '../../../../components/Dropdowns/Select';
import Input from '../../../../components/Inputs/Input';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import Flex from '../../../../components/Utils/Flex/Flex';
import { config } from '../../../../env';
import { useFetch } from '../../../../services/hooks/useFetch';
import { ICandidatLn } from './candidat-ln.types';

function AddCandidatLn({
  id = null,
  exam,
  candidat = null,
  onFinish,
}: {
  id?: string | null;
  exam: string;
  candidat?: ICandidatLn | null;
  onFinish: () => void;
}) {
  const [candidat_, setCandidat] = useState(() => {
    if (!candidat)
      return {
        nom: '',
        prenom: '',
        sexe: '',
        dateNaissance: '',
        telephone: '',
        age: '',
        exam,
        departement: '',
      };
    return candidat;
  });
  const [loadingDepartement, departements] = useFetch({
    url: config.api_url.defrecrutLn + 'departements/exam/' + exam,
  });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setCandidat({ ...candidat_, [name]: value });
  };

  const handleSelectChange = (name: string, value: any) => {
    setCandidat({
      ...candidat_,
      [name]: typeof value === 'string' ? value : value.id,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) {
      axios.post(config.api_url.defrecrutLn + 'candidats', candidat_);
    } else {
      axios.put(config.api_url.defrecrutLn + 'candidats/' + id, candidat_);
    }
    setCandidat({
      nom: '',
      prenom: '',
      sexe: '',
      dateNaissance: '',
      telephone: '',
      age: '',
      exam,
      departement: '',
    });

    onFinish();
  };

  if (loadingDepartement) return <ComponentLoading />;

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="col" gap="15px">
        <Select
          label="Départements"
          values={departements}
          display="label"
          required
          onChange={(value) => handleSelectChange('departement', value)}
        />

        <div className="grid grid-cols-2 w-full gap-20">
          <Input
            label="Nom"
            value={candidat_.nom}
            name="nom"
            required
            onChange={handleChange}
          />

          <Input
            label="Prénom"
            value={candidat_.prenom}
            name="prenom"
            required
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 w-full gap-20">
          <Select
            label="Genre"
            values={['H', 'F']}
            onChange={(v) => handleSelectChange('sexe', v)}
          />

          <Input
            label="Date de naissance"
            type="date"
            value={candidat_.dateNaissance}
            name="dateNaissance"
            required
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 w-full gap-20">
          <Input
            label="Téléphone"
            type="tel"
            value={candidat_.telephone}
            name="telephone"
            required
            onChange={handleChange}
          />

          <Input
            label="Age"
            type="number"
            value={candidat_.age}
            name="age"
            required
            onChange={handleChange}
          />
        </div>

        <Button expand>Valider</Button>
      </Flex>
    </form>
  );
}

export default AddCandidatLn;
