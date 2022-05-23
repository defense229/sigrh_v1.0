import React, { useEffect, useRef, useState } from 'react';
import Select from '../../../components/Dropdowns/Select';
import Flex from '../../../components/Utils/Flex/Flex';
import { config } from '../../../env';
import { useFetch } from '../../../services/hooks/useFetch';
import { useParams } from 'react-router-dom';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import ReactToPrint from 'react-to-print';
import Button from '../../../components/Buttons/Button';

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
  const [scores, setScores] = useState<any[]>([]);
  const scoresCopie = useRef<any[]>([]);
  const ref = useRef(null);

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
          console.log(score.candidate.departement, value.label);
          return score.candidate.departement === value.label;
        }),
      ]);
    }
  };

  if (loadingDep || loadingRes || loadingField) return <ComponentLoading />;

  console.log(result, fields);

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
      <ReactToPrint
        trigger={() => {
          return <Button>Imprimer</Button>;
        }}
        content={() => ref.current}
      />

      <div className="mt-20 datatable" ref={ref}>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: 'center', width: '350px' }}>Rang</th>
              {/* <th>Nom et prénoms</th> */}
              <th>Département</th>
              <th style={{ width: '80px' }}>Genre</th>
              {fields.map((field: any) => {
                return (
                  <th
                    style={{ textAlign: 'center', width: '150px' }}
                    key={field.id}>
                    {field.label}
                  </th>
                );
              })}
              <th style={{ textAlign: 'center', width: '150px' }}>Total</th>
              <th style={{ textAlign: 'center', width: '150px' }}>Moy</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score: any, index: number) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>
                    {index + 1}{' '}
                    {index === 0 ? (
                      <sup className="fs-10">
                        {score.candidate?.sexe === 'F' ? 'ère' : 'er'}
                      </sup>
                    ) : (
                      <sup className="fs-10">ème</sup>
                    )}
                  </td>
                  {/* <td>
                    {score.candidate?.nom} {score.candidate?.prenom}
                  </td> */}
                  <td>{score.candidate?.departement}</td>
                  <td>{score.candidate?.sexe}</td>
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
