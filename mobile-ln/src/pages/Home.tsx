import React, { useState } from 'react';
import BottomBar from '../components/Layout/BottomBar/BottomBar';
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
  const [opt_questions, setOptQuestions] = useState<number[]>([]);
  const [authLoading, user] = useAuth();

  const handleFinish = () => {
    setQuestions([]);
    setCurrent(null);
  };

  if (authLoading) return <ComponentLoading />;

  return (
    <div className="bg-light h-full relative">
      <Topbar user={user as IUser} />
      <Condition cond={!current}>
        <CandidatNumber user={user} setCurrent={setCurrent} />
      </Condition>
      <Condition cond={!!current && questions.length === 0}>
        <SelectNumbers
          user={user}
          numero={current?.numero}
          candidate={current}
          setQuestions={setQuestions}
          setOptQuestions={setOptQuestions}
        />
      </Condition>
      <Condition cond={!!current && questions.length > 0}>
        <EnterScore
          questions={questions}
          opt_questions={opt_questions}
          onFinish={handleFinish}
          candidate={current}
          user={user}
        />
      </Condition>
      <BottomBar />
    </div>
  );
}

export default Home;
