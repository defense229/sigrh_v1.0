import React from 'react';
import { useParams } from 'react-router-dom';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import Container from '../../../../components/Utils/Containers/Container';
import Flex from '../../../../components/Utils/Flex/Flex';
import BackLink from '../../../../components/Utils/Others/BackLink';
import { config } from '../../../../env';
import { useFetch } from '../../../../services/hooks/useFetch';
import SvgDepartementIcon from '../../../../components/Svgs/SvgDepartementIcon';
import QrCodeCenterDisplay from './QrCodeCenterDisplay';

function QrCodes() {
  const { id, center } = useParams();
  const [loading, repartition] = useFetch({
    url: config.api_url.sigrh + 'exams/repartition/' + id + '/' + center,
  });

  if (loading) return <ComponentLoading />;

  console.log(repartition);

  return (
    <Container>
      <BackLink />
      <div className="card" style={{ margin: '20px 0' }}>
        <Flex items="center" gap="12px">
          <SvgDepartementIcon />
          <div className="fs-18 semi-bold">{center?.toUpperCase()}</div>
        </Flex>
        <hr className="my-6" />
        {Object.keys(repartition).map((center_: string) => {
          return (
            <div key={center_}>
              <QrCodeCenterDisplay
                center_={center_}
                repartition={repartition}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default QrCodes;
