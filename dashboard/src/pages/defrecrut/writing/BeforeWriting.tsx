import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from '../../../components/Dropdowns/Select';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import Flex from '../../../components/Utils/Flex/Flex';
import DisplayStats from '../../../components/Utils/Others/DisplayStats';
import { config } from '../../../env';
import { useFetch } from '../../../services/hooks/useFetch';

function BeforeWriting() {
  const { id } = useParams();

  const [loadingConfig, config_, , , reload] = useFetch({
    url: config.api_url.sigrh + 'settings/' + id,
  });

  const [loadingDep, departements] = useFetch({
    url: config.api_url.sigrh + 'departements/exam/' + id,
  });

  const [loadingField, fields] = useFetch({
    url: config.api_url.sigrh + 'fields/' + id,
  });
  const [scores, setScores] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const scoresCopie = useRef<any[]>([]);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingConfig) {
      console.log(config_);
      if (!config_.result) navigate('/exam/' + id + '/writing');
      else {
        setScores(config_.result.values ? [...config_.result.values] : []);
        setStats(JSON.parse(JSON.stringify(config_.result.stats)));
        scoresCopie.current = config_.result.values
          ? [...config_.result.values]
          : [];
      }
    }
  }, [loadingConfig]);

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

  if (loadingDep || loadingField || loadingConfig) return <ComponentLoading />;

  return (
    <div>
      <Flex justify="between" items="center">
        <div className="fs-20 bold">Résultats du concours</div>
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

      <div className="pt-5 pb-10 px-10 mt-4  radius-6 bg-white">
        <Flex justify="between" items="center" className="mb-4">
          <div className="fs-14 semi-bold">Statistiques</div>
        </Flex>

        <div className="mx-4">
          <DisplayStats stats={stats} />
        </div>
      </div>

      <div className="mt-10 datatable" ref={ref}>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: 'center', width: '350px' }}>Rang</th>
              <th>Nom et prénoms</th>
              <th>Département</th>
              <th style={{ width: '80px' }}>Genre</th>
              {fields.map((field: any) => {
                return (
                  <th
                    style={{ textAlign: 'center', width: '150px' }}
                    key={field.id}>
                    {field.label.slice(0, 5)}
                  </th>
                );
              })}
              <th style={{ textAlign: 'center', width: '150px' }}>Tot</th>
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
                  <td>
                    {score.candidate?.nom} {score.candidate?.prenom}
                  </td>
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

export default BeforeWriting;
