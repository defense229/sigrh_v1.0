import axios from 'axios';
import React, { useState } from 'react';
import Button from '../../../../components/Buttons/Button';
import Input from '../../../../components/Inputs/Input';
import Flex from '../../../../components/Utils/Flex/Flex';
import { config } from '../../../../env';

function AddDepartement({
  id,
  label = null,
  onFinish,
}: {
  id: string;
  label?: string | null;
  onFinish: () => void;
}) {
  const [departement, setDepartement] = useState({
    label,
    exam: id,
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!label) {
      await axios.post(config.api_url.sigrh + 'departements', departement);
    } else {
      await axios.put(config.api_url.sigrh + 'departements/' + id, departement);
    }
    setDepartement({
      label: '',
      exam: id,
    });
    onFinish();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="col" gap="15px">
        <Input
          value={departement.label ?? ''}
          onChange={(event) =>
            setDepartement({
              ...departement,
              label: event.target.value,
            })
          }
          label="Libellé du département"
          required
        />

        <Button expand>Valider</Button>
      </Flex>
    </form>
  );
}

export default AddDepartement;
