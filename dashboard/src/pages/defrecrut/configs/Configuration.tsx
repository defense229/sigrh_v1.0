import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import PageLoading from '../../../components/Progress/PageLoading';
import SvgArrowLeft from '../../../components/Svgs/SvgArrowLeft';
import ConfigCard from '../../../components/Utils/Containers/ConfigCard';
import Container from '../../../components/Utils/Containers/Container';
import Flex from '../../../components/Utils/Flex/Flex';
import Condition from '../../../components/Utils/Others/Condition';
import { config } from '../../../env';
import { useFetch } from '../../../services/hooks/useFetch';
import CodeForm from './CodeForm';
import SimulationForm from './SimulationForm';
import StatsResult from './StatsResult';

function Configuration() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadingConfig, config_, , , reload] = useFetch({
    url: config.api_url.sigrh + 'settings/' + id,
  });
  const [_, fields] = useFetch({
    url: config.api_url.sigrh + 'fields/' + id,
  });

  const setSimulationResult = (data: any) => {
    console.log('[simulated-data]: ', data);
    setResult(data);
  };
  useEffect(() => {
    if (!loadingConfig) {
      console.log(config_);
      if (config_.isDefinitive) navigate('/exam/' + id + '/before-writing');
    }
  }, [loadingConfig]);

  if (loadingConfig) return <ComponentLoading />;

  console.log(config_);

  return (
    <div>
      <Condition cond={!isSimulating}>
        <Container>
          <div className="fs-20 bold">Délibérations</div>
          <ConfigCard title="Paramétrage de simulation">
            <SimulationForm
              onSimulationStarted={() => {
                setIsSimulating(true);
              }}
              setSimulationResult={setSimulationResult}
            />
          </ConfigCard>

          {loadingConfig ? (
            <></>
          ) : (
            <Condition
              cond={
                !(config_ && config_.codeDopa && config_.codeDopa.length > 0)
              }>
              <ConfigCard title="Code de désanonymat">
                <CodeForm reload={reload} />
              </ConfigCard>
            </Condition>
          )}
        </Container>
      </Condition>

      <Condition cond={isSimulating}>
        <Condition cond={result === null}>
          <PageLoading message="Simulation en cours ..." />
        </Condition>
        <Condition cond={result !== null}>
          <Container>
            <div>
              <Flex
                items="center"
                gap="15px"
                className="cursor-pointer"
                onClick={() => {
                  setIsSimulating(false);
                  setResult(null);
                }}>
                <SvgArrowLeft color="#085A03" />
                <div className="text-primary semi-bold fs-16">Retour</div>
              </Flex>
            </div>
            <StatsResult
              stats={result ? result.stats : {}}
              fields={fields ? fields : []}
              values={result ? result.values : []}
            />
          </Container>
        </Condition>
      </Condition>
    </div>
  );
}

export default Configuration;
