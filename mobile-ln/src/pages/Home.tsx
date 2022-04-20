import React, { useState } from 'react';
import Topbar from '../components/Layout/Topbar/Topbar';
import ComponentLoading from '../components/Progress/ComponentLoading';
import Condition from '../components/Utils/Others/Condition';
import { useAuth } from '../services/hooks/useAuth';
import { IUser } from '../services/types';
import CandidatNumber from './CandidatNumber';
import EnterScore from './EnterScore';
import SelectNumbers from './SelectNumbers';

function Home() {
  const [current, setCurrent] = useState<any>(null);
  const [questions, setQuestions] = useState<number[]>([]);
  const [authLoading, user] = useAuth();

  const handleFinish = () => {
    setQuestions([]);
    setCurrent(null);
  };

  if (authLoading) return <ComponentLoading />;

  console.log(current, questions, !!current && questions.length === 0);

  return (
    <div>
      <Topbar user={user as IUser} />
      <Condition cond={!current}>
        <CandidatNumber user={user} setCurrent={setCurrent} />
      </Condition>
      <Condition cond={!!current && questions.length === 0}>
        <SelectNumbers
          user={user}
          numero={current?.numero}
          setQuestions={setQuestions}
        />
      </Condition>
      <Condition cond={!!current && questions.length > 0}>
        <EnterScore
          questions={questions}
          onFinish={handleFinish}
          candidate={current}
        />
      </Condition>
    </div>
  );
}

export default Home;
