import React, { Suspense, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import SvgEye from '../../../components/Svgs/SvgEye';
import DataTable from '../../../components/Tables/DataTable';
import Flex from '../../../components/Utils/Flex/Flex';
import StatusDisplay from '../../../components/Utils/Others/StatusDisplay';
import { useTable } from '../../../services/hooks/useTable';
import { candidatesList } from '../../../services/providers/store/atoms/candidate.atom';
import { CandidateStatus } from '../../../services/types/candidates.types';

type Props = {
  id?: string;
};

function LoadCandidates({ id = '' }: Props) {
  const candidates = useRecoilValue(candidatesList(id));
  const { hovered, ...tableProps } = useTable(candidates);
  const navigate = useNavigate();

  const handleDetailClick = useCallback(
    (row: any) => {
      navigate(`/exam/${id}/candidate/${row.id}`);
    },
    [id, navigate]
  );

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
      { label: 'Téléphone', name: 'telephone' },
      {
        label: 'Statut',
        render: (row: any) => (
          <StatusDisplay
            value={
              row.accepted
                ? CandidateStatus.ACCEPTED
                : !row.numero
                ? CandidateStatus.NEW
                : CandidateStatus.REJECTED
            }
          />
        ),
      },
      {
        label: '',
        render: (row: any) => (
          <Flex items="center" gap="5px" onClick={() => handleDetailClick(row)}>
            {row.id === hovered.id ? (
              <Flex justify="center" items="center">
                <SvgEye color="#7A8184" />
              </Flex>
            ) : (
              <></>
            )}
            <div
              className={`pr-3 mr-3 ${
                row.id === hovered.id ? 'visible' : 'not-visible'
              }`}
            >
              <u>
                <b>Voir les détails</b>
              </u>
            </div>
          </Flex>
        ),
      },
    ],
    [hovered.id, handleDetailClick]
  );


  return (
    <div className="pb-8">
      <DataTable
        cols={cols}
        selection
        rows={candidates.values}
        {...tableProps}
      />
    </div>
  );
}

export function CandidatesAll() {
  const { id } = useParams();
  return (
    <Suspense fallback={<ComponentLoading />}>
      <LoadCandidates id={id} />
    </Suspense>
  );
}
export default CandidatesAll;
