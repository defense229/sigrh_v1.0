import axios from 'axios';
import React, { useState } from 'react';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';
import Toast from '../components/Modals/Toast';
import ComponentLoading from '../components/Progress/ComponentLoading';
import Condition from '../components/Utils/Others/Condition';
import { config } from '../env';
import { UserRoles } from '../services/types/user.types';
import CandidatResult from './CandidatResult';

type Props = {
  questions: any[];
  opt_questions: any[];
  onFinish: () => void;
  candidate: any;
  user: any;
};

function EnterScore({
  questions,
  opt_questions,
  onFinish,
  candidate,
  user,
}: Props) {
  const [index, setIndex] = useState(1);
  const [opt_index, setOptIndex] = useState(1);
  const [endFirst, setEndFirst] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [score, setScore] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(questions, opt_questions);

  const handleNext = async () => {
    console.log(opt_index);
    if (!endFirst) {
      const q = questions[index - 1];
      setLoading(true);
      await axios.post(config.api_url.defrecrutLn + 'questions/add-score', {
        exam: q.exam,
        field: q.id,
        candidate: candidate.id,
        value: Number(score),
        extras: user.id,
        isOptional: false,
      });
      setLoading(false);
      if (index === questions.length) {
        setEndFirst(true);
      }
      setScore('');
      setIndex((index) => index + 1);
    } else {
      if (opt_questions.length === 0) {
        setOpenToast(true);
        setTimeout(() => {
          onFinish();
        }, 2000);
      } else {
        const oq = opt_questions[opt_index - 1];

        setLoading(true);
        await axios.post(config.api_url.defrecrutLn + 'questions/add-score', {
          exam: oq.exam,
          field: oq.id,
          candidate: candidate.id,
          value: Number(score),
          extras: user.id,
          isOptional: true,
        });
        setLoading(false);

        console.log(opt_index);
        if (opt_index === opt_questions.length) {
          setOpenToast(true);
          setTimeout(() => {
            onFinish();
          }, 2000);
        }
        setScore('');
        setOptIndex((opt_index) => opt_index + 1);
      }
    }
  };

  if (
    (index >= questions.length + 1 && opt_index >= opt_questions.length + 1) ||
    loading
  ) {
    return (
      <div>
        <ComponentLoading />
        <Toast open={openToast} ypos="bottom" xpos="left">
          Toutes les questions du candidats viennent d'être prise en compte.
        </Toast>
      </div>
    );
  }

  if (user.role === UserRoles.PRESIDENT) {
    return <CandidatResult candidate={candidate} onFinish={onFinish} />;
  }

  return (
    <div className="my-20 mx-10 bg-white radius-8 p-10">
      <div className="fs-18 bold mb-8">
        Attribution de notes (
        {index <= questions.length
          ? candidate.language
          : candidate.optionalLanguage}
        )
      </div>
      <hr />

      <Condition cond={index <= questions.length}>
        <div className="fs-18 bold mt-10 mb-4">
          Question N° {index}/{questions.length}
        </div>
        <div className="fs-16" style={{ fontWeight: '500' }}>
          {index <= questions.length ? questions[index - 1].label : ''}
        </div>
      </Condition>

      <Condition cond={index > questions.length}>
        <div className="fs-18 bold mt-10 mb-4">
          Question N° {opt_index}/{opt_questions.length}
        </div>
        <div className="fs-16" style={{ fontWeight: '500' }}>
          {opt_index <= opt_questions.length
            ? opt_questions[opt_index - 1].label
            : ''}
        </div>
      </Condition>

      <div className="my-10 mt-20">
        <Input
          label="Note"
          type="number"
          value={score}
          placeholder="Saisir la note ici"
          onChange={(e) => setScore(e.target.value)}
        />
      </div>

      <div className="mt-30">
        <Button
          disabled={!(Number(score) >= 0 && Number(score) <= 20)}
          expand
          onClick={handleNext}>
          Valider
        </Button>
      </div>
    </div>
  );
}

export default EnterScore;
