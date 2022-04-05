import React, { useState } from 'react';
import Flex from '../../components/Utils/Flex/Flex';
import Textarea from '../../components/Inputs/Textarea';
import Button from '../../components/Buttons/Button';
import axios from 'axios';
import { config } from '../../env';

function AddExam({ onFinish = () => {} }: { onFinish: (x?: any) => void }) {
  const [label, setLabel] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    await axios.post(config.api_url.sigrh + 'exams', {
      label,
    });
    setLoading(false);
    onFinish();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="col" gap="16px">
        <div className="w-full">
          <Textarea
            value={label}
            onChange={(event) => {
              setLabel(event.target.value);
            }}
            label="Libellé de l’examen"
            required
          />
        </div>

        <Button disabled={label.length === 0} loading={loading} expand>
          Créer
        </Button>
      </Flex>
    </form>
  );
}

export default AddExam;
