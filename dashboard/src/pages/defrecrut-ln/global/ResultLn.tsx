import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { config } from '../../../env';
import { useParams } from 'react-router-dom';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import Dropdown from '../../../components/Dropdowns/Dropdown';
import Button from '../../../components/Buttons/Button';
import Flex from '../../../components/Utils/Flex/Flex';
import Select from '../../../components/Dropdowns/Select';
import Modal from '../../../components/Modals/Modal';
import Input from '../../../components/Inputs/Input';

function ResultLn() {
  const [results, setResults] = useState([]);
  const [resultsCopie, setResultsCopie] = useState<any>([]);
  const [departements, setDepartements] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [departement, setDepartement] = useState('*');
  const [modal, setModal] = useState(false);
  const [path, setPath] = useState('');
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const cb = async () => {
      const reponseDep = await axios.get(
        config.api_url.defrecrutLn + 'departements/exam/' + id
      );
      setDepartements(reponseDep.data);

      const response = await axios.get(
        config.api_url.defrecrutLn + 'questions/results/' + id
      );
      setResults(response.data);
      setResultsCopie(response.data);
      setLoading(false);
      setLimit(response.data.length);
    };
    cb();
  }, [id]);

  const download = (path_: string) => {
    setPath(path_);
    setModal(true);
  };

  if (loading) return <ComponentLoading />;

  console.log(departements);

  return (
    <div>
      <Flex justify="between" items="center">
        <div className="fs-20 bold">Résultats</div>
        <Flex justify="end" items="center" gap="20px">
          <Select
            placeholder="Choisir un département"
            values={[
              ...departements,
              { label: 'Tous les départements', id: '*' },
            ]}
            onChange={(v: { id: string }) => {
              setDepartement(v.id);
              const newResults = results.filter(
                (r: any) => r.candidate.departement.id === v.id
              );
              console.log(newResults);
              setResultsCopie(v.id === '*' ? [...results] : newResults);
              setLimit(v.id === '*' ? results.length : newResults.length);
            }}
            display="label"
          />
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
        </Flex>
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
            {resultsCopie.map((score: any, index: number) => {
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

      <Modal
        title="Nombre de candiats à sélectionner"
        open={modal}
        onClose={() => {
          setModal(false);
        }}>
        <div className="p-10">
          <Input
            type="number"
            label="Nombre de candidats"
            value={limit}
            onChange={(e: any) => {
              setLimit(e.target.value);
            }}
          />

          <div className="mt-10">
            <Button
              expand
              onClick={() => {
                setModal(false);
                setLimit(results.length);
                window.open(
                  config.api_url.defrecrutLn +
                    'questions/' +
                    path +
                    '/' +
                    id +
                    "?name=Concours de recrutement militaire sur titre au titre de l'année 2022" +
                    '&departement=' +
                    departement +
                    '&limit=' +
                    limit
                );
              }}>
              Continuer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ResultLn;
