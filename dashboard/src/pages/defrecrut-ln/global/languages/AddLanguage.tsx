import axios from 'axios';
import React, { useState } from 'react';
import Button from '../../../../components/Buttons/Button';
import Input from '../../../../components/Inputs/Input';
import Flex from '../../../../components/Utils/Flex/Flex';
import { config } from '../../../../env';

function AddLanguage({
  id = null,
  exam,
  label = null,
  onFinish,
}: {
  id?: string | null;
  exam: string;
  label?: string | null;
  onFinish: () => void;
}) {
  const [language, setLanguage] = useState({
    label,
    exam,
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!label) {
      await axios.post(config.api_url.defrecrutLn + 'languages', language);
    } else {
      await axios.put(config.api_url.defrecrutLn + 'language/' + id, language);
    }
    setLanguage({
      label: '',
      exam,
    });
    onFinish();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="col" gap="15px">
        <Input
          value={language.label ?? ''}
          onChange={(event) =>
            setLanguage({
              ...language,
              label: event.target.value,
            })
          }
          label="Saisir la langue"
          required
        />
        <Button expand>Valider</Button>
      </Flex>
    </form>
  );
}

export default AddLanguage;
