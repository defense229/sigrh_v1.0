import React from 'react';
import { useParams } from 'react-router-dom';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import { config } from '../../../env';
import { useFetch } from '../../../services/hooks/useFetch';

function SportStats() {
  const { id } = useParams();

  const [loading, stats] = useFetch({
    url: config.api_url.sigrh + 'candidats/sport-stats-all/' + id,
  });

  if (loading) return <ComponentLoading />;

  return (
    <div className="stats-table p-10">
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>Départements</th>
            <th colSpan={3} style={{ textAlign: 'center' }}>
              Présents
            </th>
            <th colSpan={3} style={{ textAlign: 'center' }}>
              Absents
            </th>
            <th colSpan={3} style={{ textAlign: 'center' }}>
              Retenus
            </th>
            <th colSpan={3} style={{ textAlign: 'center' }}>
              Non retenus
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
                  <td>{stat[1].presentsMen}</td>
                  <td>{stat[1].presentsWomen}</td>
                  <td>{stat[1].presents}</td>

                  <td>{stat[1].notPresentsMen}</td>
                  <td>{stat[1].notPresentsWomen}</td>
                  <td>{stat[1].notPresents}</td>

                  <td>{stat[1].acceptedMen}</td>
                  <td>{stat[1].acceptedWomen}</td>
                  <td>{stat[1].accepted}</td>

                  <td>{stat[1].notAcceptedMen}</td>
                  <td>{stat[1].notAcceptedWomen}</td>
                  <td>{stat[1].notAccepted}</td>
                </tr>
              );
            })}
          <tr>
            <td>Tous</td>
            <td>{stats.all.presentsMen}</td>
            <td>{stats.all.presentsWomen}</td>
            <td>{stats.all.presents}</td>

            <td>{stats.all.notPresentsMen}</td>
            <td>{stats.all.notPresentsWomen}</td>
            <td>{stats.all.notPresents}</td>

            <td>{stats.all.acceptedMen}</td>
            <td>{stats.all.acceptedWomen}</td>
            <td>{stats.all.accepted}</td>

            <td>{stats.all.notAcceptedMen}</td>
            <td>{stats.all.notAcceptedWomen}</td>
            <td>{stats.all.notAccepted}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SportStats;
