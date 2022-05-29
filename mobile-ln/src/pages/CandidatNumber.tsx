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
import Select from '../components/Dropdowns/Select';
import { useFetch } from '../services/hooks/useFetch';

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
  const [lgLoading, lgs] = useFetch({
    url: config.api_url.defrecrutLn + 'languages/exam/625c395ca5a9760f63a5b9e5',
  });
  const [payload, setPayload] = useState({
    language: null,
    optionalLanguage: '',
  });

  console.log(lgs);

  useEffect(() => {
    axios
      .get(config.api_url.defrecrutLn + 'candidats/jury/' + user.jury)
      .then((response: AxiosResponse) => {
        setAllCandidates(response.data);
      });
  }, [user.jury]);

  const handleSelect = async () => {
    setBtnLoading(true);
    await axios.post(
      config.api_url.defrecrutLn +
        'jury/pick-candidate/' +
        user.exam +
        '/' +
        user.departement +
        '/' +
        user.jury +
        '/' +
        _number,
      payload
    );
    setBtnLoading(false);
  };

  useEffect(() => {
    addSocketListener(
      WsEvents.CANDIDATE_SELECTED,
      (info: { jury: any; candidate: any }) => {
        console.log(info);
        if (info.jury === (user as IUser).jury) {
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
    <div className="my-20 mx-10">
      <Condition cond={candidate === null}>
        <div className="bg-primary text-center py-5 radius-8 px-20 text-white">
          <div>Nombre de candidats reçus :</div>
          <div className="fs-24 bold">{allCandidates}</div>
        </div>
        <div className="bg-white p-10 mt-10 radius-8">
          <div className="fs-18 bold">
            Veuillez entrer les informations du candidat
          </div>

          <div className="mt-20">
            <Input
              value={_number}
              label="N° de table"
              onChange={(e) => setNumber(e.target.value.toUpperCase())}
            />

            <div className="mt-8">
              <Select
                values={lgs}
                display="label"
                label="Choisir la langue principale"
                onChange={(v: any) => {
                  setPayload({ ...payload, language: v.label });
                }}
              />
            </div>

            <div className="mt-8">
              <Select
                values={lgs}
                display="label"
                label="Choisir la langue secondaire"
                onChange={(v: any) => {
                  setPayload({ ...payload, optionalLanguage: v.label });
                }}
              />
            </div>
          </div>

          <div className="mt-20">
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
