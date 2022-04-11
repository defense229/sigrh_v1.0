import axios from 'axios';
import React, { Suspense, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Button from '../../../../components/Buttons/Button';
import Modal from '../../../../components/Modals/Modal';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import SvgEdit from '../../../../components/Svgs/SvgEdit';
import Table from '../../../../components/Tables/Table';
import EmptyState from '../../../../components/Utils/EmptyState/EmptyState';
import Flex from '../../../../components/Utils/Flex/Flex';
import { config } from '../../../../env';
import { useQueryParams } from '../../../../services/hooks/useQueryParams';
import { useTable } from '../../../../services/hooks/useTable';
import { centersList } from '../../../../services/providers/store/atoms/center.atom';
import { useSocketListener } from '../../../../services/providers/websocket/SocketProvider';
import AddCenter from './AddCenter';

function LoadCentersSettings() {
  const { id } = useParams();
  const centers = useRecoilValue(centersList(id ?? ''));
  const { setSelectedItems, hovered, reload, ...tableProps } = useTable({
    values: centers,
    total: centers.length,
  });
  const [current, setCurrent] = useState<any>(null);
  const addSocketListener = useSocketListener();

  addSocketListener('test', (data: any) => {
    console.log('Center socket: ', data);
  });

  const handleRun = async (id: string) => {
    const response = await axios.post(
      config.api_url.sigrh + 'exams/create-repartition/' + id
    );
    console.log(response.data);
  };

  const cols = useMemo(
    () => [
      { label: 'Département', name: 'departement' },
      { label: 'Nb centre', name: 'centers' },
      { label: 'Nb salles/centre', name: 'rooms' },
      { label: 'Nb candidat/salle', name: 'candidates' },
      {
        label: 'Répartition',
        render: (row: any) => (
          <div
            className="text-primary fs-10 semi-bold"
            onClick={() => handleRun(row.id)}
          >
            <u>Lancer la répart.</u>
          </div>
        ),
      },
      {
        label: '',
        render: (row: any) => {
          return (
            <div
              className={
                (row.id === hovered.id ? 'visible' : 'not-visible') +
                ' text-right'
              }
              onClick={() => setCurrent(row)}
            >
              <SvgEdit />
            </div>
          );
        },
      },
    ],
    [hovered.id]
  );

  const removeItems = async (rows: any[]) => {
    await axios.post(
      config.api_url.sigrh + 'departements/archive',
      rows.map((row) => row.id)
    );
    reload();
  };

  if (centers.length === 0)
    return (
      <div className="my-10">
        <EmptyState>Aucun centre trouvé</EmptyState>
      </div>
    );

  return (
    <div className="datatable my-10">
      <Table
        onRemoved={removeItems}
        selection
        cols={cols}
        rows={centers}
        {...tableProps}
      />

      <Modal open={!!current} title="Modifier le centre d’examen">
        <AddCenter
          center={current ? current.id : null}
          onClose={() => {
            setCurrent(null);
            reload();
          }}
        />
      </Modal>
    </div>
  );
}

function CentersSettings() {
  const [open, setOpen] = useState(false);
  const { reload } = useQueryParams();
  const toggle = () => setOpen((open) => !open);
  const handleClose = () => {
    setOpen(false);
    reload();
  };

  return (
    <div>
      <Flex justify="end" gap="20px">
        <Button outlined>Démarrer les répartitions</Button>
        <Button onClick={toggle}>Créer un centre d'examen</Button>
      </Flex>
      <Suspense fallback={<ComponentLoading />}>
        <LoadCentersSettings />
      </Suspense>
      <Modal open={open} title="Créer un centre d’examen" onClose={handleClose}>
        <AddCenter onClose={handleClose} />
      </Modal>
    </div>
  );
}

export default CentersSettings;
