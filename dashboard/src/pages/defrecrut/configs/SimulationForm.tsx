import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import Input from '../../../components/Inputs/Input';
import { config } from '../../../env';

function SimulationForm({
  setSimulationResult,
  onSimulationStarted,
}: {
  setSimulationResult: (data: any) => void;
  onSimulationStarted: () => void;
}) {
  const { id } = useParams();
  const [configs, setConfigs] = useState({
    take: '',
    quotaUnit: 'NUMBER',
    wmQuotaUnit: 'PERCENT',
    wmQuota: '',
    isDefinitive: false,
    exam: id,
    considerAllField: true,
  });
  console.log(configs);

  const runSimulation = async (e: any) => {
    e.preventDefault();
    onSimulationStarted();
    const response = await axios.get(
      config.api_url.sigrh + 'exams/simulation/make',
      {
        params: configs,
      }
    );
    setSimulationResult(response.data);
  };

  return (
    <div className="datatable no-hover">
      <form onSubmit={runSimulation}>
        <table className="w-full">
          <tr>
            <td className="py-10">
              Nombre de candidats à sélectionner (en{' '}
              <select
                value={configs.quotaUnit}
                onChange={(e) => {
                  setConfigs((configs) => ({
                    ...configs,
                    quotaUnit: e.target.value,
                  }));
                }}>
                <option value="NUMBER">Val</option>
                <option value="PERCENT">%</option>
              </select>
              ):
            </td>
            <td>
              <Input
                type="number"
                value={configs.take}
                onChange={(e) => {
                  setConfigs((configs) => ({
                    ...configs,
                    take: e.target.value,
                  }));
                }}
                min={0}
              />
            </td>
          </tr>
          <tr>
            <td className="py-10">
              Quota mimimum de femmes (en{' '}
              <select
                value={configs.wmQuotaUnit}
                onChange={(e) => {
                  setConfigs((configs) => ({
                    ...configs,
                    wmQuotaUnit: e.target.value,
                  }));
                }}>
                <option value="NUMBER">Val</option>
                <option value="PERCENT">%</option>
              </select>
              ):
            </td>
            <td>
              <Input
                value={configs.wmQuota}
                onChange={(e) => {
                  setConfigs((configs) => ({
                    ...configs,
                    wmQuota: e.target.value,
                  }));
                }}
                type="number"
                min={0}
              />
            </td>
          </tr>
        </table>
        <div className="text-right my-4 pr-10">
          <Button outlined>Lancer la simulation</Button>
        </div>
      </form>
    </div>
  );
}

export default SimulationForm;
