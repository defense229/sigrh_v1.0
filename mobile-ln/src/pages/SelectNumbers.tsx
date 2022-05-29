import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';
import ComponentLoading from '../components/Progress/ComponentLoading';
import SvgArrowBack from '../components/Svgs/SvgArrowBack';
import Flex from '../components/Utils/Flex/Flex';
import Condition from '../components/Utils/Others/Condition';
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
  setOptQuestions: (v: any) => void;
  candidate: any;
};

function SelectNumbers({
  user,
  numero,
  setQuestions,
  setOptQuestions,
  candidate,
}: Props) {
  const [_numbers, setNumbers] = useState<any[]>([]);
  const [_opt_numbers, setOptNumbers] = useState<any[]>([]);
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
    await axios.post(
      config.api_url.defrecrutLn +
        'jury/pick-candidate-numbers/' +
        user.exam +
        '/' +
        user.departement +
        '/' +
        user.jury +
        '/' +
        numero +
        '/' +
        'false',
      _numbers.map((num: string) => Number(num.trim()))
    );

    if (_opt_numbers.length > 0) {
      await axios.post(
        config.api_url.defrecrutLn +
          'jury/pick-candidate-numbers/' +
          user.exam +
          '/' +
          user.departement +
          '/' +
          user.jury +
          '/' +
          numero +
          '/' +
          'true',
        _opt_numbers.map((num: string) => Number(num.trim()))
      );
    }
  };

  useEffect(() => {
    addSocketListener(
      WsEvents.CANDIDATE_NUMBERS_SELECTED,
      (info: {
        jury: any;
        candidate: any;
        nums: number[];
        questions: any[];
        optional: boolean;
      }) => {
        console.log(info);
        if (info.jury === (user as IUser).jury) {
          if (!info.optional) setQuestions(info.questions);
          else setOptQuestions(info.questions);
        }
      }
    );
    // eslint-disable-next-line
  }, []);

  if (loading || user.role === UserRoles.MEMBER) return <ComponentLoading />;

  return (
    <div className="my-20 mx-10 p-10 radius-8 bg-white">
      <Flex gap="15px" className="mb-8">
        <div style={{ width: '20px' }}>
          <SvgArrowBack className="cursor-pointer" />
        </div>
        <div className="fs-16 bold">
          Veuillez saisir le numéro des questions choisit par le candidat
        </div>
      </Flex>

      <div className="mt-20">
        <div className="semi-bold mb-6">
          Langue principale ({candidate.language})
        </div>
        <div
          className="grid gap-20"
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

      <Condition cond={!!candidate.optionalLanguage}>
        <div className="mt-20">
          <div className="semi-bold mb-6">
            Langue secondaire ({candidate.optionalLanguage})
          </div>
          <div
            className="grid gap-20"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
            }}>
            {new Array(configs.optionals).fill(0).map((_, index: number) => {
              return (
                <div key={index}>
                  <Input
                    label={'N° ' + (index + 1)}
                    value={_opt_numbers[index]}
                    onChange={(e) => {
                      const b = [..._opt_numbers];
                      b[index] = e.target.value;
                      setOptNumbers(b);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Condition>

      <div className="mt-30">
        <Button expand onClick={handleSelect}>
          Continuer
        </Button>
      </div>
    </div>
  );
}

export default SelectNumbers;
