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
import Button from '../../../../components/Buttons/Button';
import Dropdown from '../../../../components/Dropdowns/Dropdown';

function QrCodes() {
  const { id, center } = useParams();
  const [loading, repartition] = useFetch({
    url: config.api_url.sigrh + 'exams/repartition/' + id + '/' + center,
  });

  const [loadingFields, fields] = useFetch({
    url: config.api_url.sigrh + 'fields/' + id,
  });

  const downloadList = (type: 'pdf' | 'xlsx') => {
    window.open(
      config.api_url.sigrh +
        'exams/download-repartition/' +
        type +
        '/' +
        id +
        '/' +
        center,
      '_blank'
    );
  };

  if (loading || loadingFields) return <ComponentLoading />;

  return (
    <Container>
      <BackLink />
      <div className='card' style={{ margin: '20px 0' }}>
        <Flex justify='between' items='center'>
          <Flex items='center' gap='12px'>
            <SvgDepartementIcon />
            <div className='fs-18 semi-bold'>{center?.toUpperCase()}</div>
          </Flex>
          <Dropdown
            dropdown={
              <div>
                <div
                  className='mb-4 hover-u cursor-pointer'
                  onClick={() => downloadList('pdf')}>
                  Format PDF
                </div>
                <div
                  className='mt-4 hover-u cursor-pointer'
                  onClick={() => downloadList('xlsx')}>
                  Format Excel
                </div>
              </div>
            }>
            <Button outlined>Télécharger la liste des candidats</Button>
          </Dropdown>
        </Flex>
        <hr className='my-6' />
        {Object.keys(repartition).map((center_: string) => {
          return (
            <div key={center_}>
              <QrCodeCenterDisplay
                exam={id ?? ''}
                departement={center ?? ''}
                key={center_}
                fields={fields}
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
