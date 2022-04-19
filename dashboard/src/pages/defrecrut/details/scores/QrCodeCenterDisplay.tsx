import React, { useState } from 'react';
import Flex from '../../../../components/Utils/Flex/Flex';
import QrCodeRoomDisplay from './QrCodeRoomDisplay';
import SvgCenterIcon from '../../../../components/Svgs/SvgCenterIcon';
import SvgArrowDown from '../../../../components/Svgs/SvgArrowDown';

type Props = {
  center_: string;
  repartition: any;
};

function QrCodeCenterDisplay({ center_, repartition }: Props) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((open) => !open);
  return (
    <div>
      <Flex justify="between" items="center">
        <Flex items="center" gap="12px">
          <SvgCenterIcon />
          <div>
            <b>{center_}</b> ({repartition[center_].length} salle
            {repartition[center_].length > 1 ? 's' : ''} de classe)
          </div>
        </Flex>
        <Flex items="center" gap="12px">
          <SvgArrowDown onClick={toggle} />
        </Flex>
      </Flex>
      <hr className="my-6" />
      {repartition[center_].map((candidates: any, index: number) => {
        return (
          <div key={index}>
            {open && (
              <QrCodeRoomDisplay index={index} candidates={candidates} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default QrCodeCenterDisplay;
