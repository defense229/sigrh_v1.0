import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import { config } from '../../../env';
import { useFetch } from '../../../services/hooks/useFetch';

const FileCollectStats = () => {
  const { id } = useParams();

  const [loading, stats] = useFetch({
    url: config.api_url.sigrh + 'candidats/file-collect-stats-all/' + id,
  });

  if (loading) return <ComponentLoading />;

  return (
    <div className="stats-table p-10">
      <div className="text-right mb-10">
        <Button
          outlined
          onClick={() => {
            window.open(
              config.api_url.sigrh +
                'candidats/download-file-collect-stats/pdf/' +
                id,
              '_blank'
            );
          }}>
          Télécharger
        </Button>
      </div>

      <table>
        <thead>
          <tr>
            <th rowSpan={2}>Départements</th>
            <th colSpan={3} style={{ textAlign: 'center' }}>
              Candidats reçus
            </th>
            <th colSpan={3} style={{ textAlign: 'center' }}>
              Acceptés
            </th>
            <th colSpan={3} style={{ textAlign: 'center' }}>
              Rejetés
            </th>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}>Homme</th>
            <th style={{ textAlign: 'center' }}>Femme</th>
            <th style={{ textAlign: 'center' }}>T</th>

            <th style={{ textAlign: 'center' }}>Homme</th>
            <th style={{ textAlign: 'center' }}>Femme</th>
            <th style={{ textAlign: 'center' }}>T</th>

            <th style={{ textAlign: 'center' }}>Homme</th>
            <th style={{ textAlign: 'center' }}>Femme</th>
            <th style={{ textAlign: 'center' }}>T</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats)
            .filter((stat) => stat[0] !== 'all')
            .map((stat: any[], index) => {
              return (
                <tr key={index}>
                  <td>{stat[0]}</td>
                  <td>{stat[1].mens}</td>
                  <td>{stat[1].womens}</td>
                  <td>{stat[1].womens + stat[1].mens}</td>

                  <td>{stat[1].acceptedMen}</td>
                  <td>{stat[1].acceptedWomen}</td>
                  <td>{stat[1].accepted}</td>

                  <td>{stat[1].rejectedMen}</td>
                  <td>{stat[1].rejectedWomen}</td>
                  <td>{stat[1].rejected}</td>
                </tr>
              );
            })}
          <tr>
            <td>Tous</td>
            <td>{stats.all.mens}</td>
            <td>{stats.all.womens}</td>
            <td>{stats.all.womens + stats.all.mens}</td>

            <td>{stats.all.acceptedMen}</td>
            <td>{stats.all.acceptedWomen}</td>
            <td>{stats.all.accepted}</td>

            <td>{stats.all.rejectedMen}</td>
            <td>{stats.all.rejectedWomen}</td>
            <td>{stats.all.rejected}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FileCollectStats;
