import React, { useEffect, useRef, useState } from 'react';
import Select from '../../../components/Dropdowns/Select';
import Flex from '../../../components/Utils/Flex/Flex';
import { config } from '../../../env';
import { useFetch } from '../../../services/hooks/useFetch';
import { useParams } from 'react-router-dom';
import ComponentLoading from '../../../components/Progress/ComponentLoading';

function Writing() {
  const { id } = useParams();

  const [loadingDep, departements] = useFetch({
    url: config.api_url.sigrh + 'departements/exam/' + id,
  });
  const [loadingRes, result] = useFetch({
    url: config.api_url.sigrh + 'exams/results/' + id,
  });
  const [loadingField, fields] = useFetch({
    url: config.api_url.sigrh + 'fields/' + id,
  });
  const [loadingCandidate, candidates] = useFetch({
    url: config.api_url.sigrh + 'candidats/exam/' + id,
  });
  const [scores, setScores] = useState<any[]>([]);
  const scoresCopie = useRef<any[]>([]);

  useEffect(() => {
    setScores(result ? [...result] : []);
    scoresCopie.current = result ? [...result] : [];
  }, [result]);

  const handleChange = (value: any) => {
    if (value.id === '*') {
      setScores([...scoresCopie.current]);
    } else {
      setScores([
        ...scoresCopie.current.filter((score: any) => {
          console.log(getCandidate(score.candidate).departement, value.label);
          return getCandidate(score.candidate).departement === value.label;
        }),
      ]);
    }
  };

  const getCandidate = (id: string) => {
    return candidates.values.find((c: any) => c.id === id);
  };

  if (loadingDep || loadingRes || loadingField || loadingCandidate)
    return <ComponentLoading />;

  console.log(result, candidates, fields);

  return (
    <div>
      <Flex justify="between" items="center">
        <div className="fs-20 bold">Phase écrite</div>
        <div style={{ width: '300px' }}>
          <Select
            display="label"
            placeholder="Tous les départements"
            onChange={(value: any) => handleChange(value)}
            values={[
              ...departements,
              { label: 'Tous les départements', id: '*' },
            ]}
          />
        </div>
      </Flex>

      <div className="mt-20 datatable">
        <table>
          <thead>
            <tr>
              <th>Rang</th>
              <th>Département</th>
              <th>Genre</th>
              {fields.map((field: any) => {
                return <th key={field.id}>{field.label}</th>;
              })}
              <th>Total</th>
              <th>Moyenne</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{getCandidate(score.candidate)?.departement}</td>
                  <td>{getCandidate(score.candidate)?.sexe}</td>
                  {fields.map((field: any) => {
                    return (
                      <td style={{ textAlign: 'center' }} key={field.id}>
                        {score.grades.find((s: any) => s.field === field.id)
                          ? score.grades.find((s: any) => s.field === field.id)
                              .value +
                            ' (' +
                            score.grades.find((s: any) => s.field === field.id)
                              .coef +
                            ')'
                          : ''}
                      </td>
                    );
                  })}
                  <td style={{ textAlign: 'center' }}>{score.total}</td>
                  <td style={{ textAlign: 'center' }}>
                    {score.mean.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Writing;
