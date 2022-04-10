import React, { useState } from 'react';
import Button from '../../../../components/Buttons/Button';
import LabeledCheckbox from '../../../../components/Checkbox/LabeledCheckbox';
import Select from '../../../../components/Dropdowns/Select';
import Input from '../../../../components/Inputs/Input';
import Flex from '../../../../components/Utils/Flex/Flex';
import Condition from '../../../../components/Utils/Others/Condition';

export interface IRadioType {
  unique: boolean;
  double: boolean;
}

function AddCenter() {
  const [type, setType] = useState({ unique: true, double: false });

  const toggleChange = () => {
    setType((prev: IRadioType) => ({
      unique: !prev.unique,
      double: !prev.double,
    }));
  };

  return (
    <form>
      <Flex direction="col" gap="15px">
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
            <Select required label="Département" />
          </Condition>

          <Condition cond={type.double}>
            <div className="grid grid-cols-2 gap-20">
              <Select required label="Département 1" />
              <Select required label="Département 2" />
            </div>
          </Condition>
        </div>

        <Input type="number" label="Nombre de centre" required />
        <Input type="number" label="Nombre de salles par centre" required />
        <Input type="number" label="Nombre de candidats par salle" required />

        <Button expand>Valider</Button>
      </Flex>
    </form>
  );
}

export default AddCenter;
