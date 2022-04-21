import React, { useState } from 'react';
import Select from '../../../components/Dropdowns/Select';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import SvgPersons from '../../../components/Svgs/SvgPersons';
import SvgPersonsAccepted from '../../../components/Svgs/SvgPersonsAccepted';
import SvgPersonsRejected from '../../../components/Svgs/SvgPersonsRejected';
import StatsFrame from '../../../components/Utils/Containers/StatsFrame';
import Flex from '../../../components/Utils/Flex/Flex';
import Condition from '../../../components/Utils/Others/Condition';
import { config } from '../../../env';
import { useFetch } from '../../../services/hooks/useFetch';
import { ExamSteps, STEPS_SELECT } from '../../../services/libs';

type Props = {
  id?: string;
};

function ExamStats({ id = '' }: Props) {
  const [loadingStats, stats] = useFetch({
    url: config.api_url.sigrh + 'candidats/all-stats/' + id,
  });
  const [selectedStep, setSelectedStep] = useState(STEPS_SELECT[0]);

  if (loadingStats) return <ComponentLoading />;

  return (
    <div className='bg-white radius-16 p-8 my-8 elevation-5'>
      <Flex justify='between' items='center'>
        <div className='fs-18 bold'>Statistiques</div>
        <div style={{ width: '250px' }}>
          <Select
            placeholder='Choisir une phase'
            onChange={setSelectedStep}
            values={STEPS_SELECT}
          />
        </div>
      </Flex>
      <hr className='my-8' />
      <Condition cond={selectedStep.id === ExamSteps.candidateFileCollectStep}>
        <div className='grid grid-cols-3 gap-30'>
          <StatsFrame
            description='Total des canditatures reçues'
            icon={<SvgPersons />}
            value={stats.candidateFileCollectStep.received}
          />
          <StatsFrame
            description='Canditatures acceptées'
            icon={<SvgPersonsAccepted />}
            value={stats.candidateFileCollectStep.accepted}
          />
          <StatsFrame
            description='Canditatures rejetées'
            icon={<SvgPersonsRejected />}
            value={stats.candidateFileCollectStep.rejected}
          />
        </div>
      </Condition>
      <Condition cond={selectedStep.id === ExamSteps.sportStep}>
        <div className='grid grid-cols-4 gap-30'>
          <StatsFrame
            description='Présents'
            icon={<SvgPersons />}
            value={stats.sportStep.presents}
          />
          <StatsFrame
            description='Absents'
            icon={<SvgPersonsRejected />}
            value={stats.sportStep.notPresents}
          />
          <StatsFrame
            description='Acceptées'
            icon={<SvgPersonsAccepted />}
            value={stats.sportStep.accepted}
          />
          <StatsFrame
            description='Rejetées'
            icon={<SvgPersonsRejected />}
            value={stats.sportStep.notAccepted}
          />
        </div>
      </Condition>
    </div>
  );
}

export default ExamStats;
