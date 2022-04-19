import axios from 'axios';
import React, { useState } from 'react';
import Button from '../../../../components/Buttons/Button';
import Textarea from '../../../../components/Inputs/Textarea';
import Flex from '../../../../components/Utils/Flex/Flex';
import { config } from '../../../../env';

function AddQuestionLn({
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
  const [question, setQuestion] = useState({
    label,
    exam,
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!label) {
      await axios.post(config.api_url.defrecrutLn + 'questions', question);
    } else {
      await axios.put(config.api_url.defrecrutLn + 'question/' + id, question);
    }
    setQuestion({
      label: '',
      exam,
    });
    onFinish();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="col" gap="15px">
        <Textarea
          value={question.label ?? ''}
          onChange={(event) =>
            setQuestion({
              ...question,
              label: event.target.value,
            })
          }
          label="Enoncé de la question"
          required
        />
        <Button expand>Valider</Button>
      </Flex>
    </form>
  );
}

export default AddQuestionLn;
