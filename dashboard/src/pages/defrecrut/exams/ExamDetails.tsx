import React from 'react';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import SvgExam from '../../../components/Svgs/SvgExam';
import Flex from '../../../components/Utils/Flex/Flex';
import StatusDisplay from '../../../components/Utils/Others/StatusDisplay';
import { config } from '../../../env';
import { useFetch } from '../../../services/hooks/useFetch';

type Props = {
  id?: string;
};

function ExamDetails({ id = '' }: Props) {
  const [loadingExam, exam] = useFetch({
    url: config.api_url.sigrh + 'exams/' + id,
  });

  if (loadingExam) return <ComponentLoading />;

  return (
    <div className="radius-8 border-dark p-8">
      <Flex items="center" justify="between">
        <Flex items="center" gap="10px">
          <SvgExam />
          <div>
            <Flex>
              <div className="pr-6 mr-6 border-right-gray">
                Examen n° <b>{exam?.id}</b>
              </div>
              <div>
                Libellé : <b>{exam?.label}</b>
              </div>
            </Flex>
            <div className="mt-3">
              Date de création :{' '}
              <b>{new Date(exam?.createdAt ?? '').toLocaleString()}</b>
            </div>
          </div>
        </Flex>
        <StatusDisplay value={exam.status} />
      </Flex>
    </div>
  );
}

export default ExamDetails;
