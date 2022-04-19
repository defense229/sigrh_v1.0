import axios from 'axios';
import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Button from '../../../../components/Buttons/Button';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import Table from '../../../../components/Tables/Table';
import EmptyState from '../../../../components/Utils/EmptyState/EmptyState';
import { config } from '../../../../env';
import { useQueryParams } from '../../../../services/hooks/useQueryParams';
import { useTable } from '../../../../services/hooks/useTable';
import { jurysLnList } from '../../../../services/providers/store/atoms/departement.atom';

function LoadJury({ reload }: { reload: any }) {
  const { id } = useParams();
  const departements = useRecoilValue(jurysLnList(id ?? ''));
  const { setSelectedItems, hovered, ...tableProps } = useTable({
    values: departements,
    total: departements.length,
  });

  const cols = useMemo(
    () => [{ label: 'Numéro', name: 'numero' }],
    [hovered.id]
  );

  const removeItems = async (rows: any[]) => {
    await axios.post(
      config.api_url.defrecrutLn + 'jury/archive',
      rows.map((row) => row.id)
    );
    reload();
  };

  if (departements.length === 0)
    return (
      <div className="my-10">
        <EmptyState>Aucun jury trouvé</EmptyState>
      </div>
    );

  return (
    <div className="datatable my-8">
      <Table
        onRemoved={removeItems}
        selection
        cols={cols}
        rows={departements}
        {...tableProps}
      />
    </div>
  );
}

function Jury() {
  const { id } = useParams();
  const { reload } = useQueryParams();

  const handleAddJury = async () => {
    await axios.post(config.api_url.defrecrutLn + 'jury/exam/' + id, {});
    reload();
  };

  return (
    <div>
      <div className="fs-20 bold">Jury</div>
      <div className="text-right">
        <Button onClick={handleAddJury}>Ajouter un jury</Button>
      </div>
      <Suspense fallback={<ComponentLoading />}>
        <LoadJury reload={reload} />
      </Suspense>
    </div>
  );
}

export default Jury;
