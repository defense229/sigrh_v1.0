import React, { Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import Table from '../../../components/Tables/Table';
import Flex from '../../../components/Utils/Flex/Flex';
import { candidatesList } from '../../../services/providers/store/atoms/candidate.atom';

type Props = {
  id?: string;
};

function LoadCandidatesList({ id = '' }: Props) {
  const candidates = useRecoilValue(candidatesList(id));
  const navigate = useNavigate();

  const cols = useMemo(
    () => [
      { label: 'N° de table', name: 'numero' },
      {
        label: 'Nom et prénom(s)',
        render: (row: any) => (
          <div>
            {row.nom} {row.prenom}
          </div>
        ),
      },
      { label: 'Département', name: 'departement' },
      { label: 'Genre', name: 'sexe' },
    ],
    []
  );

  return (
    <div className="mt-10">
      <Flex justify="between" items="center">
        <div className="fs-18 bold">Liste des candidats</div>
        <div
          className="text-primary cursor-pointer"
          onClick={() => {
            navigate('settings');
          }}
        >
          <u>Voir tous les candidats</u>
        </div>
      </Flex>

      <div className="py-8 datatable">
        <Table cols={cols} rows={candidates.values} />
      </div>
    </div>
  );
}

export function CandidatesList({ id = '' }: Props) {
  return (
    <Suspense fallback={<ComponentLoading />}>
      <LoadCandidatesList id={id} />
    </Suspense>
  );
}
export default CandidatesList;
