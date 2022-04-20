import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';
import { config } from '../env';
import { WsEvents } from '../services/providers/websocket/events';
import { useSocketListener } from '../services/providers/websocket/SocketProvider';
import { IUser } from '../services/types';

type Props = {
  user: any;
  numero: string;
  setQuestions: (v: any) => void;
};

function SelectNumbers({ user, numero, setQuestions }: Props) {
  const [_numbers, setNumbers] = useState('');
  const addSocketListener = useSocketListener();

  const handleSelect = async () => {
    console.log(_numbers);
    const response = await axios.post(
      config.api_url.defrecrutLn +
        'jury/pick-candidate-numbers/' +
        user.exam +
        '/' +
        user.departement +
        '/' +
        user.jury +
        '/' +
        numero,
      _numbers
        .trim()
        .split(',')
        .map((num: string) => Number(num.trim()))
    );
    console.log(response.data);
  };

  useEffect(() => {
    addSocketListener(
      WsEvents.CANDIDATE_NUMBERS_SELECTED,
      (info: {
        jury: any;
        candidate: any;
        nums: number[];
        questions: any[];
      }) => {
        console.log(info);
        if (info.jury === (user as IUser).jury) {
          setQuestions(info.questions);
        }
      }
    );
  }, []);

  return (
    <div className='my-40 mx-20'>
      <div className='fs-20 bold text-center'>
        Veuillez saisir les numéros choisis par le candidat.
      </div>

      <div className='mt-30'>
        <Input
          label='Séparer les numéros par une virgule'
          value={_numbers}
          onChange={(e) => setNumbers(e.target.value)}
        />
      </div>

      <div className='my-10'>
        <Button expand onClick={handleSelect}>
          Continuer
        </Button>
      </div>
    </div>
  );
}

export default SelectNumbers;
