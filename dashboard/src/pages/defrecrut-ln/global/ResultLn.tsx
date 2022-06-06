import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { config } from '../../../env';
import { useParams } from 'react-router-dom';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import Dropdown from '../../../components/Dropdowns/Dropdown';
import Button from '../../../components/Buttons/Button';
import Flex from '../../../components/Utils/Flex/Flex';

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

  const download = (path: string) => {
    window.open(
      config.api_url.defrecrutLn +
        'questions/' +
        path +
        '/' +
        id +
        "?name=Concours de recrutement militaire sur titre au titre de l'année 2022"
    );
  };

  if (loading) return <ComponentLoading />;

  return (
    <div>
      <Flex justify="between" items="center">
        <div className="fs-20 bold">Résultats</div>
        <div>
          <Dropdown
            dropdown={
              <div>
                <div
                  className="cursor-pointer hover-u mt-4"
                  onClick={() => download('download-list-pdf')}>
                  Liste en PDF
                </div>
                <div
                  className="cursor-pointer hover-u mt-4"
                  onClick={() => download('download-list-xlsx')}>
                  Liste en Excel
                </div>
              </div>
            }>
            <Button outlined>Télécharger</Button>
          </Dropdown>
        </div>
      </Flex>

      <div className="my-20 datatable">
        <table>
          <thead>
            <tr>
              <th>Rg</th>
              <th>Nom et prénoms</th>
              <th>Dep</th>
              <th>N° </th>
              <th>Notes</th>
              <th>Notes *</th>
              <th>Total</th>
              <th>Total *</th>
              <th>Moy</th>
              <th>Moy *</th>
              <th>Moy finale</th>
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
                  <td>{score.candidate.departement.label}</td>
                  <td>{score.candidate.numero}</td>
                  <td>
                    {score.grades
                      .filter((s: any) => !s.isOptional)
                      .map((s: any) => s.value)
                      .join(' - ')}
                  </td>
                  <td>
                    {score.grades
                      .filter((s: any) => s.isOptional)
                      .map((s: any) => s.value)
                      .join(' - ')}
                  </td>
                  <td>{score.optTotal}</td>
                  <td>{score.total}</td>
                  <td className="text-right">
                    {Number(score.optMean).toFixed(2)}
                  </td>
                  <td className="text-right">
                    {Number(score.mean_).toFixed(2)}
                  </td>
                  <td className="text-right">
                    {Number(score.mean).toFixed(2)}
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

export default ResultLn;
