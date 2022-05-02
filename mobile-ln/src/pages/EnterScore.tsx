import axios from 'axios';
import React, { useState } from 'react';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';
import Toast from '../components/Modals/Toast';
import ComponentLoading from '../components/Progress/ComponentLoading';
import { config } from '../env';
import { UserRoles } from '../services/types/user.types';
import CandidatResult from './CandidatResult';

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

  console.log(user.jury);
  const handleNext = async () => {
    const q = questions[index - 1];
    setLoading(true);
    await axios.post(config.api_url.defrecrutLn + 'questions/add-score', {
      exam: q.exam,
      field: q.id,
      candidate: candidate.id,
      value: Number(score),
      extras: user.id,
    });
    setLoading(false);
    if (index === questions.length) {
      setOpenToast(true);
      setTimeout(() => {
        onFinish();
      }, 2000);
    }
    setScore('');
    setIndex((index) => index + 1);
  };

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

  if (user.role === UserRoles.PRESIDENT) {
    return <CandidatResult candidate={candidate} onFinish={onFinish} />;
  }

  return (
    <div className='my-20 mx-10 bg-white radius-8 p-10'>
      <div className='fs-18 bold mb-8'>Attribution de notes</div>
      <hr />

      <div className='fs-18 bold mt-10 mb-4'>
        Question N° {index}/{questions.length}
      </div>
      <div className='fs-16' style={{ fontWeight: '500' }}>
        {index <= questions.length ? questions[index - 1].label : ''}
      </div>

      <div className='my-10 mt-20'>
        <Input
          label='Note'
          type='number'
          value={score}
          placeholder='Saisir la note ici'
          onChange={(e) => setScore(e.target.value)}
        />
      </div>

      <div className='mt-30'>
        <Button expand onClick={handleNext}>
          Valider
        </Button>
      </div>
    </div>
  );
}

export default EnterScore;
