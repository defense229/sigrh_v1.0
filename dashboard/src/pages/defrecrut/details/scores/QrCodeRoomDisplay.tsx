import React, { useState } from 'react';
import Table from '../../../../components/Tables/Table';
import Flex from '../../../../components/Utils/Flex/Flex';
import SvgClassIcon from '../../../../components/Svgs/SvgClassIcon';
import SvgDownload from '../../../../components/Svgs/SvgDownload';
import SvgArrowDown from '../../../../components/Svgs/SvgArrowDown';

type Props = {
  index: number;
  candidates: any[];
};

function QrCodeRoomDisplay({ index, candidates }: Props) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((open) => !open);

  return (
    <div className="px-10">
      <Flex justify="between" items="center">
        <Flex items="center" gap="12px">
          <SvgClassIcon />
          <div>
            <b>Salle {index + 1}</b> ({candidates.length} candidats)
          </div>
        </Flex>
        <Flex items="center" gap="12px">
          <SvgDownload color="#085A03" />
          <SvgArrowDown onClick={toggle} />
        </Flex>
      </Flex>
      <hr className="my-6" />
      {open && (
        <div className="datatable my-10">
          <Table
            rows={candidates}
            cols={[
              { label: 'Numéro de table', name: 'numero' },
              { label: 'Département', name: 'departement' },
            ]}
          ></Table>
        </div>
      )}
    </div>
  );
}

export default QrCodeRoomDisplay;
