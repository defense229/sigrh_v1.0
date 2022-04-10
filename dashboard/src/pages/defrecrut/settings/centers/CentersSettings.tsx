import React, { Suspense, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Button from '../../../../components/Buttons/Button';
import Modal from '../../../../components/Modals/Modal';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import Table from '../../../../components/Tables/Table';
import EmptyState from '../../../../components/Utils/EmptyState/EmptyState';
import { centersList } from '../../../../services/providers/store/atoms/center.atom';
import AddCenter from './AddCenter';

function LoadCentersSettings() {
  const { id } = useParams();
  const centers = useRecoilValue(centersList(id ?? ''));
  console.log(centers);

  const cols = useMemo(
    () => [
      { label: 'Département', name: 'departement' },
      { label: 'Nb centre', name: 'centers' },
      { label: 'Nb salles/centre', name: 'rooms' },
      { label: 'Nb candidat/salle', name: 'candidates' },
      { label: 'Répartition', render: (row: any) => <></> },
    ],
    []
  );

  if (centers.length === 0)
    return (
      <div className="my-10">
        <EmptyState>Aucun centre trouvé</EmptyState>
      </div>
    );

  return <Table cols={cols} rows={centers} />;
}

function CentersSettings() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((open) => !open);

  return (
    <div>
      <div className="text-right">
        <Button onClick={toggle}>Créer un centre d'examen</Button>
      </div>
      <Suspense fallback={<ComponentLoading />}>
        <LoadCentersSettings />
      </Suspense>
      <Modal open={open} title="Créer un centre d’examen">
        <AddCenter />
      </Modal>
    </div>
  );
}

export default CentersSettings;
