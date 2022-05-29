import React, { useEffect, useState } from 'react';
import SvgUserCircle from '../components/Svgs/SvgUserCircle';
import Flex from '../components/Utils/Flex/Flex';
import { WsEvents } from '../services/providers/websocket/events';
import { useSocketListener } from '../services/providers/websocket/SocketProvider';
import Button from '../components/Buttons/Button';

type Props = {
  candidate: any;
  onFinish: () => void;
};

function CandidatResult({ candidate, onFinish }: Props) {
  const addSocketListener = useSocketListener();
  const [result, setResult] = useState({
    total: 0,
    optTotal: 0,
    coefSum: 0,
    optCoefSum: 0,
    mean_: 0,
    optMean: 0,
    mean: 0,
    grades: [],
  });

  useEffect(() => {
    addSocketListener(WsEvents.NEW_SCORE_ADDED, (info: any) => {
      console.log(info);
      if (info.score.candidate === candidate.id) {
        const r = {
          total: info.candidateScore.total,
          optTotal: info.candidateScore.optTotal,
          coefSum: info.candidateScore.coefSum,
          optCoefSum: info.candidateScore.optCoefSum,
          mean_: info.candidateScore.mean_,
          optMean: info.candidateScore.optMean,
          mean: info.candidateScore.mean,
          grades: [],
        };

        const s_: any = {};
        for (const s of info.candidateScore.grades) {
          if (s.field in s_) {
            s_[s.field].push(s);
          } else {
            s_[s.field] = [s];
          }
        }

        r.grades = Object.values(s_);
        setResult(r);
        console.log(r);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-20 mx-10">
      <div className="bg-white radius-8 p-10">
        <div className="fs-18 bold mb-8">Candidat</div>
        <hr />

        <div className="px-5 py-7 mt-10 border-primary radius-6">
          <Flex items="center" gap="20px">
            <SvgUserCircle />
            <div>
              <div className="bold">
                {candidate.nom.toUpperCase() +
                  ' ' +
                  candidate.prenom.split(' ')[0].toUpperCase()}
              </div>
              <div className="mt-1">
                N° de table :{' '}
                <span className="semi-bold">{candidate.numero}</span>
              </div>
            </div>
          </Flex>
        </div>
      </div>

      <div className="bg-white radius-8 p-10 mt-10">
        <div className="fs-18 bold mb-8">Notes</div>
        <hr />

        <div className="my-8">
          {result.grades.length > 0 &&
            result.grades.map((score: any, index: number) => {
              return (
                <div key={index} className="my-4 fs-16">
                  Notes qst. {index + 1} :{' '}
                  <b>
                    {score
                      .map((it: any) => Number(it.value).toFixed(2))
                      .join(' - ')}
                  </b>
                </div>
              );
            })}
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td></td>
                <td>Normal</td>
                <td>Avec opt.</td>
                <td>Final</td>
              </tr>
              <tr>
                <td>
                  <b>Total</b>
                </td>
                <td className="pl-4 py-1 semi-bold">
                  {result.optTotal.toFixed(2)}
                </td>
                <td className="pl-4 py-1 semi-bold">
                  {result.total.toFixed(2)}
                </td>
                <td className="pl-4 py-1 semi-bold">-</td>
              </tr>
              <tr>
                <td>
                  <b>Moyenne</b>
                </td>
                <td className="pl-4 py-1 semi-bold">
                  {result.optMean.toFixed(2)}
                </td>
                <td className="pl-4 py-1 semi-bold">
                  {result.mean_.toFixed(2)}
                </td>
                <td className="pl-4 py-1 semi-bold">
                  {result.mean.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-20">
          <Button
            expand
            onClick={() => {
              if (
                window.confirm(
                  "Etes-vous sur de vouloir clôturer l'enregistrement des notes pour ce candidat ?"
                )
              ) {
                onFinish();
              }
            }}>
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CandidatResult;
