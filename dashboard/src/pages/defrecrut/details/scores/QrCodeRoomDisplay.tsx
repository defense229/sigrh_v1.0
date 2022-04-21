import React, { useState } from 'react';
import Table from '../../../../components/Tables/Table';
import Flex from '../../../../components/Utils/Flex/Flex';
import SvgClassIcon from '../../../../components/Svgs/SvgClassIcon';
import SvgDownload from '../../../../components/Svgs/SvgDownload';
import SvgArrowDown from '../../../../components/Svgs/SvgArrowDown';
import Dropdown from '../../../../components/Dropdowns/Dropdown';
import { config } from '../../../../env';

type Props = {
  index: number;
  candidates: any[];
  exam: string;
  departement: string;
  fields: any[];
  center: string;
};

function QrCodeRoomDisplay({
  index,
  candidates,
  exam,
  departement,
  fields,
  center,
}: Props) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((open) => !open);

  const downloadList = (room: number, field: string) => {
    window.open(
      config.api_url.sigrh +
        'exams/download-repartition/list/' +
        exam +
        '/' +
        departement +
        '/' +
        field +
        '/' +
        center +
        '/' +
        room,
      '_blank'
    );
  };

  const downloadCodes = (room: number, field: string) => {
    window.open(
      config.api_url.sigrh +
        'exams/download-repartition/code/' +
        exam +
        '/' +
        departement +
        '/' +
        field +
        '/' +
        center +
        '/' +
        room,
      '_blank'
    );
  };

  return (
    <div className='px-10'>
      <Flex justify='between' items='center'>
        <Flex items='center' gap='12px'>
          <SvgClassIcon />
          <div>
            <b>Salle {index + 1}</b> ({candidates.length} candidats)
          </div>
        </Flex>
        <Flex items='center' gap='12px'>
          <Dropdown
            dropdown={
              <Flex direction='col' gap='12px' style={{ width: '300px' }}>
                <div>
                  {fields.map((field: any, i: number) => (
                    <div
                      className='cursor-pointer hover-u my-4'
                      key={i}
                      onClick={() => downloadList(index, field.id)}>
                      Liste de désanonymat ({field.label})
                    </div>
                  ))}
                </div>
                <div>
                  {fields.map((field: any, i: number) => (
                    <div
                      className='cursor-pointer hover-u my-4'
                      key={i}
                      onClick={() => downloadCodes(index, field.id)}>
                      Qrcodes ({field.label})
                    </div>
                  ))}
                </div>
              </Flex>
            }>
            <SvgDownload className='cursor-pointer' color='#085A03' />
          </Dropdown>
          <SvgArrowDown className='cursor-pointer' onClick={toggle} />
        </Flex>
      </Flex>
      <hr className='my-6' />
      {open && (
        <div className='datatable my-10'>
          <Table
            rows={candidates}
            cols={[
              { label: 'Numéro de table', name: 'numero' },
              { label: 'Département', name: 'departement' },
            ]}></Table>
        </div>
      )}
    </div>
  );
}

export default QrCodeRoomDisplay;
