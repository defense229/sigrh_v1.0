import axios from 'axios';
import React, { useState } from 'react';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';
import Toast from '../components/Modals/Toast';
import ComponentLoading from '../components/Progress/ComponentLoading';
import { config } from '../env';

type Props = {
  questions: any[];
  onFinish: () => void;
  candidate: any;
  user: any;
};

function EnterScore({ questions, onFinish, candidate, user }: Props) {
  const [index, setIndex] = useState(1);
  const [openToast, setOpenToast] = useState(false);
  const [score, setScore] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    const q = questions[index - 1];
    setLoading(true);
    await axios.post(config.api_url.defrecrutLn + 'questions/add-score', {
      exam: q.exam,
      field: q.id,
      candidate: candidate.id,
      value: Number(score),
      extras: user.jury,
    });
    setLoading(false);
    if (index === questions.length) {
      setOpenToast(true);
      setTimeout(() => {
        onFinish();
      }, 5000);
    }
    setScore('');
    setIndex((index) => index + 1);
  };
  console.log(index, questions.length);
  if (index >= questions.length + 1 || loading) {
    return (
      <div>
        <ComponentLoading />
        <Toast open={openToast} ypos='bottom' xpos='left'>
          Toutes les questions du candidats viennent d'être prise en compte.
        </Toast>
      </div>
    );
  }

  return (
    <div className='my-40 mx-20'>
      <div className='fs-20 bold text-center'>Question n° {index}</div>

      <div className='fs-16 my-4 text-center'>
        <i>{index <= questions.length ? questions[index - 1].label : ''}</i>
      </div>

      <div className='my-10 mt-20'>
        <Input
          label='Saisir la note du candidat'
          type='number'
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </div>

      <div className='my-10'>
        <Button expand onClick={handleNext}>
          Continuer
        </Button>
      </div>
    </div>
  );
}

export default EnterScore;
