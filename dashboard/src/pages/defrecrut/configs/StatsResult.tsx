import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Flex from '../../../components/Utils/Flex/Flex';
import DisplayStats from '../../../components/Utils/Others/DisplayStats';
import WritingComponent from '../writing/WritingComponent';
import ValidationButton from './ValidationButton';

function StatsResult({ stats, fields, values }: any) {
  const refStats = useRef(null);
  const refValues = useRef(null);

  return (
    <div>
      <Flex justify="between" items="center" className="mb-4">
        <div className="fs-18 bold my-8">Résultat de la simulation</div>
        <ValidationButton />
      </Flex>
      <div className="pt-5 pb-10 px-10  radius-6 bg-white">
        <Flex justify="between" items="center" className="mb-4">
          <div className="fs-14 semi-bold">Statistiques</div>
          <ReactToPrint
            trigger={() => {
              return (
                <u className="fs-14 text-danger cursor-pointer bold">
                  Imprimer
                </u>
              );
            }}
            content={() => refStats.current}
          />
        </Flex>

        <div ref={refStats} className="mx-4">
          <DisplayStats stats={stats} />
        </div>
      </div>

      <div className="pt-5 pb-10 px-10 mt-8  radius-6 bg-white">
        <Flex justify="between" items="center" className="mb-4">
          <div className="fs-14 semi-bold">Liste des candidats</div>
          <ReactToPrint
            trigger={() => {
              return (
                <u className="fs-14 text-danger cursor-pointer bold">
                  Imprimer
                </u>
              );
            }}
            content={() => refValues.current}
          />
        </Flex>

        <div ref={refValues} className="mx-4">
          <WritingComponent fields={fields} scores={values} />
        </div>
      </div>
    </div>
  );
}

export default StatsResult;
