import React, { useEffect, useState } from 'react';
import Topbar from '../components/Layout/Topbar/Topbar';
import ComponentLoading from '../components/Progress/ComponentLoading';
import Condition from '../components/Utils/Others/Condition';
import { useAuth } from '../services/hooks/useAuth';
import { WsEvents } from '../services/providers/websocket/events';
import { useSocketListener } from '../services/providers/websocket/SocketProvider';
import { IUser } from '../services/types';
import CandidatNumber from './CandidatNumber';
import SelectNumbers from './SelectNumbers';

function Home() {
  const [current, setCurrent] = useState<any>(null);
  const [questions, setQuestions] = useState<number[]>([]);
  const [authLoading, user] = useAuth();
  const addSocketListener = useSocketListener();

  useEffect(() => {
    addSocketListener(
      WsEvents.CANDIDATE_SELECTED,
      (info: { jury: any; candidate: any }) => {
        if (info.jury === (user as IUser).jury) {
          setCurrent(info.candidate);
        }
      }
    );

    addSocketListener(
      WsEvents.CANDIDATE_NUMBERS_SELECTED,
      (info: { jury: any; candidate: any; nums: number[] }) => {
        if (info.jury === (user as IUser).jury) {
          setQuestions(info.nums);
        }
      }
    );
  }, []);

  if (authLoading) return <ComponentLoading />;

  if (current) return <div>Here is current</div>;

  return (
    <div>
      <Topbar user={user as IUser} />
      <Condition cond={!!current && questions.length === 0}>
        <CandidatNumber user={user} />
      </Condition>
      <Condition cond={!!current && questions.length > 0}>
        <SelectNumbers user={user} numero={current?.numero} />
      </Condition>
    </div>
  );
}

export default Home;
