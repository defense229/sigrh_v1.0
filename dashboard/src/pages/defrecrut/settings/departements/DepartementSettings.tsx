import React, { Suspense, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from '../../../../components/Buttons/Button';
import Modal from '../../../../components/Modals/Modal';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import SvgEdit from '../../../../components/Svgs/SvgEdit';
import Table from '../../../../components/Tables/Table';
import EmptyState from '../../../../components/Utils/EmptyState/EmptyState';
import { useTable } from '../../../../services/hooks/useTable';
import {
  departementQuery,
  departementsList,
} from '../../../../services/providers/store/atoms/departement.atom';
import AddDepartement from './AddDepartement';

function LoadDepartement({ reload }: { reload: any }) {
  const { id } = useParams();
  const departements = useRecoilValue(departementsList(id ?? ''));
  const { setSelectedItems, hovered, ...tableProps } = useTable({
    values: departements,
    total: departements.length,
  });
  const [current, setCurrent] = useState<any>(null);

  const cols = useMemo(
    () => [
      { label: 'Libellé', name: 'label' },
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

  if (departements.length === 0)
    return (
      <div className="my-10">
        <EmptyState>Aucun département trouvé</EmptyState>
      </div>
    );

  return (
    <div className="datatable my-8">
      <Table selection cols={cols} rows={departements} {...tableProps} />

      <Modal open={!!current} title="Modifier le centre d’examen">
        <AddDepartement
          id={id ?? ''}
          label={current ? current.label : null}
          onFinish={() => {
            setCurrent(null);
            reload();
          }}
        />
      </Modal>
    </div>
  );
}

function DepartementSettings() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const _setDep = useSetRecoilState(departementQuery);

  const reload: any = () => _setDep({});

  const toggle = () => setOpen((open) => !open);

  return (
    <div>
      <div className="text-right">
        <Button onClick={toggle}>Créer un département</Button>
      </div>
      <Suspense fallback={<ComponentLoading />}>
        <LoadDepartement reload={reload} />
      </Suspense>
      <Modal open={open} title="Créer un centre d’examen">
        <AddDepartement
          id={id ?? ''}
          onFinish={() => {
            setOpen(false);
            reload();
          }}
        />
      </Modal>
    </div>
  );
}

export default DepartementSettings;
