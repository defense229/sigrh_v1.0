import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';
import { config } from '../env';
import { WsEvents } from '../services/providers/websocket/events';
import { useSocketListener } from '../services/providers/websocket/SocketProvider';
import { IUser } from '../services/types';
import { AxiosResponse } from 'axios';
import CandidatInfo from './CandidatInfo';
import Condition from '../components/Utils/Others/Condition';
import { UserRoles } from '../services/types/user.types';
import ComponentLoading from '../components/Progress/ComponentLoading';

type Props = {
  user: any;
  setCurrent: (v: any) => void;
};

function CandidatNumber({ user, setCurrent }: Props) {
  const [_number, setNumber] = useState('');
  const addSocketListener = useSocketListener();
  const [allCandidates, setAllCandidates] = useState(0);
  const [candidate, setCandidate] = useState<any | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    axios
      .get(config.api_url.defrecrutLn + 'candidats/jury/' + user.jury)
      .then((response: AxiosResponse) => {
        setAllCandidates(response.data);
      });
  }, [user.jury]);

  const handleSelect = async () => {
    setBtnLoading(true);
    await axios.get(
      config.api_url.defrecrutLn +
        'jury/pick-candidate/' +
        user.exam +
        '/' +
        user.departement +
        '/' +
        user.jury +
        '/' +
        _number
    );
    setBtnLoading(false);
  };

  useEffect(() => {
    addSocketListener(
      WsEvents.CANDIDATE_SELECTED,
      (info: { jury: any; candidate: any }) => {
        console.log(info);
        if (info.jury === (user as IUser).jury) {
          // setCurrent(() => info.candidate);
          if (user.role === UserRoles.MEMBER) {
            setCurrent(() => info.candidate);
          } else {
            setCandidate(info.candidate);
          }
        }
      }
    );
    // eslint-disable-next-line
  }, []);

  if (user.role === UserRoles.MEMBER) {
    return <ComponentLoading />;
  }

  return (
    <div className='my-20 mx-10'>
      <Condition cond={candidate === null}>
        <div className='bg-primary text-center py-5 radius-8 px-20 text-white'>
          <div>Nombre de candidats reçus :</div>
          <div className='fs-24 bold'>{allCandidates}</div>
        </div>
        <div className='bg-white p-10 mt-10 radius-8'>
          <div className='fs-18 bold'>
            Veuillez entrer le numéro de table du candidat
          </div>

          <div className='mt-20'>
            <Input
              value={_number}
              label='N° de table'
              onChange={(e) => setNumber(e.target.value.toUpperCase())}
            />
          </div>

          <div className='mt-20'>
            <Button
              loading={btnLoading}
              disabled={_number.length < 4}
              expand
              onClick={handleSelect}>
              Continuer
            </Button>
          </div>
        </div>
      </Condition>
      <Condition cond={candidate !== null}>
        <CandidatInfo
          onNext={() => {
            setCurrent(() => ({ ...candidate }));
            setCandidate(null);
          }}
          onPrev={() => {
            setCandidate(null);
          }}
          candidate={candidate}
        />
      </Condition>
    </div>
  );
}

export default CandidatNumber;
