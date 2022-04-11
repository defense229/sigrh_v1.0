import axios from 'axios';
import React, { useState } from 'react';
import Button from '../../../../components/Buttons/Button';
import Input from '../../../../components/Inputs/Input';
import Flex from '../../../../components/Utils/Flex/Flex';
import { config } from '../../../../env';

function AddField({
  id = null,
  exam,
  label = null,
  coefficient = 0,
  onFinish,
}: {
  id?: string | null;
  exam: string;
  label?: string | null;
  coefficient?: number;
  onFinish: () => void;
}) {
  const [field, setField] = useState({
    label,
    coefficient,
    exam,
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!label) {
      await axios.post(config.api_url.sigrh + 'fields', field);
    } else {
      await axios.put(config.api_url.sigrh + 'fields/' + id, field);
    }
    setField({
      label: '',
      coefficient: 0,
      exam,
    });
    onFinish();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="col" gap="15px">
        <Input
          value={field.label ?? ''}
          onChange={(event) =>
            setField({
              ...field,
              label: event.target.value,
            })
          }
          label="Libellé de la matière"
          required
        />

        <Input
          type="number"
          min={0}
          value={field.coefficient ?? ''}
          onChange={(event) =>
            setField({
              ...field,
              coefficient: Number(event.target.value),
            })
          }
          label="Coefficient"
          required
        />

        <Button expand>Valider</Button>
      </Flex>
    </form>
  );
}

export default AddField;
