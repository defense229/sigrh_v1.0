import axios from 'axios';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Button from '../../../../components/Buttons/Button';
import Dropdown from '../../../../components/Dropdowns/Dropdown';
import Modal from '../../../../components/Modals/Modal';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import ProgressBar from '../../../../components/Progress/ProgressBar';
import SvgEdit from '../../../../components/Svgs/SvgEdit';
import SvgMore from '../../../../components/Svgs/SvgMore';
import SvgQrcode from '../../../../components/Svgs/SvgQrcode';
import Table from '../../../../components/Tables/Table';
import EmptyState from '../../../../components/Utils/EmptyState/EmptyState';
import Flex from '../../../../components/Utils/Flex/Flex';
import IconWithLabel from '../../../../components/Utils/Others/IconWithLabel';
import { config } from '../../../../env';
import { useQueryParams } from '../../../../services/hooks/useQueryParams';
import { useTable } from '../../../../services/hooks/useTable';
import { centersList } from '../../../../services/providers/store/atoms/center.atom';
import { WsEvents } from '../../../../services/providers/websocket/events';
import { useSocketListener } from '../../../../services/providers/websocket/SocketProvider';
import AddCenter from './AddCenter';

function LoadCentersSettings() {
  const { id } = useParams();
  const centers = useRecoilValue(centersList(id ?? ''));
  const [memo, setMemo] = useState<any>({});
  const { setSelectedItems, hovered, reload, ...tableProps } = useTable({
    values: centers,
    total: centers.length,
  });
  const [current, setCurrent] = useState<any>(null);
  const addSocketListener = useSocketListener();
  const navigate = useNavigate();

  useEffect(() => {
    addSocketListener(WsEvents.REPARTITION_END, (data: any) => {
      setMemo((memo: any) => ({ ...memo, [data.id]: 100 }));
    });

    addSocketListener(WsEvents.REPARTITION_ERROR, (data: any) => {
      // console.log(WsEvents.REPARTITION_ERROR, data);
    });

    addSocketListener(WsEvents.REPARTITION_PROGRESS, (data: any) => {
      setMemo({ ...memo, [data.id]: data.percentage });
    });

    // eslint-disable-next-line
  }, []);

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
            className='text-primary fs-10 semi-bold'
            onClick={() => handleRun(row.id)}>
            {memo[row.id] ? (
              <ProgressBar value={memo[row.id]} />
            ) : (
              <u>Lancer la répart.</u>
            )}
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
              }>
              <Flex items='center' justify='end' gap='20px'>
                <SvgEdit onClick={() => setCurrent(row)} />
                <Dropdown
                  style={{ width: '200px' }}
                  dropdown={
                    <Flex direction='col' gap='20px'>
                      <IconWithLabel
                        icon={<SvgQrcode />}
                        label='Qrcodes'
                        onClick={() =>
                          navigate(`/exam/${id}/qrcodes/${row.departement}`)
                        }
                      />
                    </Flex>
                  }>
                  <SvgMore />
                </Dropdown>
              </Flex>
            </div>
          );
        },
      },
    ],
    [hovered.id, memo, id, navigate]
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
      <div className='my-10'>
        <EmptyState>Aucun centre trouvé</EmptyState>
      </div>
    );

  return (
    <div className='datatable my-10'>
      <Table
        onRemoved={removeItems}
        selection
        cols={cols}
        rows={centers}
        {...tableProps}
      />

      <Modal open={!!current} title='Modifier le centre d’examen'>
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
      <Flex justify='end' gap='20px'>
        {/* <Button outlined>Démarrer les répartitions</Button> */}
        <Button onClick={toggle}>Créer un centre d'examen</Button>
      </Flex>
      <Suspense fallback={<ComponentLoading />}>
        <LoadCentersSettings />
      </Suspense>
      <Modal open={open} title='Créer un centre d’examen' onClose={handleClose}>
        <AddCenter onClose={handleClose} />
      </Modal>
    </div>
  );
}

export default CentersSettings;
