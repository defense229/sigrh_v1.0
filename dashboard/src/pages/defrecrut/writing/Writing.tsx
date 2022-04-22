import React from 'react';
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

  if (loadingDep || loadingRes || loadingField) return <ComponentLoading />;

  return (
    <div>
      <Flex justify='between' items='center'>
        <div className='fs-20 bold'>Phase écrite</div>
        <div style={{ width: '300px' }}>
          <Select
            display='label'
            placeholder='Tous les départements'
            values={[
              ...departements,
              { label: 'Tous les départements', id: '*' },
            ]}
          />
        </div>
      </Flex>

      <div className='mt-20 datatable'>
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
            {result.map((score: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{score.candidate.departement}</td>
                  <td>{score.candidate.sexe}</td>
                  {fields.map((field: any) => {
                    return (
                      <td style={{ textAlign: 'center' }} key={field.id}>
                        {score.scores.find((s: any) => s.field === field.label)
                          ? score.scores.find(
                              (s: any) => s.field === field.label
                            ).value +
                            ' (' +
                            score.scores.find(
                              (s: any) => s.field === field.label
                            ).coefficient +
                            ')'
                          : ''}
                      </td>
                    );
                  })}
                  <td style={{ textAlign: 'center' }}>{score.sum}</td>
                  <td style={{ textAlign: 'center' }}>{score.mean}</td>
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
