import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';
import ComponentLoading from '../components/Progress/ComponentLoading';
import SvgArrowBack from '../components/Svgs/SvgArrowBack';
import Flex from '../components/Utils/Flex/Flex';
import { config } from '../env';
import { useFetch } from '../services/hooks/useFetch';
import { WsEvents } from '../services/providers/websocket/events';
import { useSocketListener } from '../services/providers/websocket/SocketProvider';
import { IUser } from '../services/types';
import { UserRoles } from '../services/types/user.types';

type Props = {
  user: any;
  numero: string;
  setQuestions: (v: any) => void;
};

function SelectNumbers({ user, numero, setQuestions }: Props) {
  const [_numbers, setNumbers] = useState<any[]>([]);
  const addSocketListener = useSocketListener();
  const [loading, configs] = useFetch({
    url: config.api_url.defrecrutLn + 'def-config',
  });

  useEffect(() => {
    if (configs && configs.questions) {
      setNumbers(new Array(configs.questions).fill(''));
    }
  }, [configs]);

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
      _numbers.map((num: string) => Number(num.trim()))
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
    // eslint-disable-next-line
  }, []);

  if (loading || user.role === UserRoles.MEMBER) return <ComponentLoading />;

  return (
    <div className='my-20 mx-10 p-10 radius-8 bg-white'>
      <Flex gap='15px' className='mb-8'>
        <div style={{ width: '20px' }}>
          <SvgArrowBack className='cursor-pointer' />
        </div>
        <div className='fs-18 bold'>
          Veuillez saisir le numéro des questions choisit par le candidat
        </div>
      </Flex>

      <div className='mt-30'>
        <div
          className='grid gap-20'
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
          }}>
          {new Array(configs.questions).fill(0).map((_, index: number) => {
            return (
              <div key={index}>
                <Input
                  label={'N° ' + (index + 1)}
                  value={_numbers[index]}
                  onChange={(e) => {
                    const b = [..._numbers];
                    b[index] = e.target.value;
                    setNumbers(b);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className='mt-30'>
        <Button expand onClick={handleSelect}>
          Continuer
        </Button>
      </div>
    </div>
  );
}

export default SelectNumbers;
