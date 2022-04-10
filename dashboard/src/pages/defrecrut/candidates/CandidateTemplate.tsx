import React, { Suspense, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import SvgEye from '../../../components/Svgs/SvgEye';
import DataTable from '../../../components/Tables/DataTable';
import EmptyState from '../../../components/Utils/EmptyState/EmptyState';
import Flex from '../../../components/Utils/Flex/Flex';
import { useTable } from '../../../services/hooks/useTable';
import { candidatesFilterList } from '../../../services/providers/store/atoms/candidate.atom';
import { CandidateQueryType } from '../../../services/types/candidates.types';

type Props = {
  id?: string;
  type: CandidateQueryType;
};

function LoadCandidateTemplate({ id = '', type }: Props) {
  const candidates = useRecoilValue(candidatesFilterList({ id, type }));
  const { hovered, ...tableProps } = useTable(candidates);
  const navigate = useNavigate();

  const handleDetailClick = (row: any) => {
    navigate(`/exam/${id}/candidate/${row.id}`);
  };

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
        label: '',
        render: (row: any) => (
          <Flex items="center" gap="5px" onClick={() => handleDetailClick(row)}>
            {row.id === hovered.id ? (
              <Flex justify="center" items="center">
                <SvgEye
                  onClick={() => {
                    // navigate('/exam/' + row.id);
                  }}
                  color="#7A8184"
                />
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
    [hovered.id]
  );

  if (candidates.total === 0)
    return (
      <div className="my-20">
        <EmptyState>Aucun candidat trouvé</EmptyState>
      </div>
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

export function CandidateTemplate({
  type = CandidateQueryType.accepted,
}: {
  type: CandidateQueryType;
}) {
  const { id } = useParams();
  return (
    <Suspense fallback={<ComponentLoading />}>
      <LoadCandidateTemplate id={id} type={type} />
    </Suspense>
  );
}
export default CandidateTemplate;
