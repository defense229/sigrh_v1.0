import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { config } from '../../../env';
import { useParams } from 'react-router-dom';
import ComponentLoading from '../../../components/Progress/ComponentLoading';

function ResultLn() {
  const [results, setResults] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cb = async () => {
      const response = await axios.get(
        config.api_url.defrecrutLn + 'questions/results/' + id
      );
      setResults(response.data);
      setLoading(false);
    };
    cb();
  }, [id]);

  if (loading) return <ComponentLoading />;

  return (
    <div>
      <div className='fs-20 bold'>Résultats</div>

      <div className='my-20 datatable'>
        <table>
          <thead>
            <tr>
              <th>Rang</th>
              <th>Nom et prénoms</th>
              <th>Notes</th>
              <th>Total</th>
              <th>Moyenne</th>
            </tr>
          </thead>
          <tbody>
            {results.map((score: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {score.candidate.nom} {score.candidate.prenom}
                  </td>
                  <td>{score.scores.map((s: any) => s.value).join(' - ')}</td>
                  <td>{score.sum}</td>
                  <td>{score.mean}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultLn;
