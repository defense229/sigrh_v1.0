import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../../../components/Buttons/Button';
import Input from '../../../../components/Inputs/Input';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import SvgCalculator from '../../../../components/Svgs/SvgCalculator';
import Flex from '../../../../components/Utils/Flex/Flex';
import BackLink from '../../../../components/Utils/Others/BackLink';
import IconWithLabel from '../../../../components/Utils/Others/IconWithLabel';
import { config } from '../../../../env';
import { useFetch } from '../../../../services/hooks/useFetch';
import { WsEvents } from '../../../../services/providers/websocket/events';
import { useSocketListener } from '../../../../services/providers/websocket/SocketProvider';

function AddScore() {
  const { id, field } = useParams();
  const [loading, counted] = useFetch({
    url: config.api_url.sigrh + 'exams/count-scores/' + id + '/' + field,
  });
  const [inserted, setInserted] = useState(0);
  const addSocketListener = useSocketListener();
  const [score, setScore] = useState({
    candidate: '',
    value: '',
  });
  const [fetchLoading, setLoading] = useState(false);

  useEffect(() => {
    if (counted) {
      setInserted(counted);
    }
  }, [counted]);

  useEffect(() => {
    addSocketListener(WsEvents.ADD_SCORE, (score: number) => {
      console.log(score);
      setInserted(score);
    });
    return () => {};
  }, [addSocketListener]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    await axios.post(config.api_url.sigrh + 'exams/add-score', {
      ...score,
      exam: id,
      field,
    });

    setScore({
      candidate: '',
      value: '',
    });
    setLoading(false);
  };

  if (loading) return <ComponentLoading />;

  return (
    <div className="w-r-quarter m-auto">
      <BackLink />
      <div className="card">
        <div className="text-center bold fs-24 mb-10">SAISIR LES NOTES</div>

        <form className="w-r-quarter m-auto py-10" onSubmit={handleSubmit}>
          <Flex direction="col" gap="16px">
            <Input
              value={score.candidate}
              onChange={(event) => {
                setScore({ ...score, candidate: event.target.value });
              }}
              label="QrCode"
              required
              autoFocus
            />
            <Input
              value={score.value}
              onChange={(event) => {
                setScore({ ...score, value: event.target.value });
              }}
              label="Saisir la note"
              required
              type="number"
            />
            <IconWithLabel
              icon={<SvgCalculator />}
              label={`${inserted} notes saisies`}
            />

            <Button
              expand
              loading={fetchLoading}
              disabled={score.candidate === '' || score.value === ''}
            >
              Valider
            </Button>
          </Flex>
        </form>
      </div>
    </div>
  );
}

export default AddScore;
