import axios from 'axios';
import React, { Suspense, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Button from '../../../../components/Buttons/Button';
import Modal from '../../../../components/Modals/Modal';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import Table from '../../../../components/Tables/Table';
import EmptyState from '../../../../components/Utils/EmptyState/EmptyState';
import { config } from '../../../../env';
import { useQueryParams } from '../../../../services/hooks/useQueryParams';
import { useTable } from '../../../../services/hooks/useTable';
import { jurysMemberLnList } from '../../../../services/providers/store/atoms/departement.atom';
import AddJuryMember from './AddJuryMember';

function LoadJuryMembers({ reload }: { reload: any }) {
  const { id } = useParams();
  const members = useRecoilValue(jurysMemberLnList(id ?? ''));
  const { setSelectedItems, hovered, ...tableProps } = useTable({
    values: members,
    total: members.length,
  });
  const [current, setCurrent] = useState<any>(null);

  const cols = useMemo(
    () => [
      { label: 'Utilisateur', name: 'username' },
      { label: 'Jury', render: (row: any) => <div>{row.jury.numero}</div> },
      {
        label: 'Département',
        render: (row: any) => <div>{row.departement.label}</div>,
      },
      {
        label: 'Rôle',
        name: 'role',
      },
    ],
    []
  );

  const removeItems = async (rows: any[]) => {
    await axios.post(
      config.api_url.defrecrutLn + 'jury/archive-members',
      rows.map((row) => row.id)
    );
    reload();
  };

  if (members.length === 0)
    return (
      <div className='my-10'>
        <EmptyState>Aucun membre de jury trouvé</EmptyState>
      </div>
    );

  return (
    <div className='datatable my-8'>
      <Table
        selection
        onRemoved={removeItems}
        cols={cols}
        rows={members}
        {...tableProps}
      />

      <Modal open={!!current} title='Modifier la question'>
        <AddJuryMember
          id={current ? current.id : null}
          exam={id ?? ''}
          member={current ? current : null}
          onFinish={() => {
            setCurrent(null);
            reload();
          }}
        />
      </Modal>
    </div>
  );
}

function JuryMembers() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { reload } = useQueryParams();

  const toggle = () => setOpen((open) => !open);

  return (
    <div>
      <div className='fs-20 bold'>Membres de jury</div>
      <div className='text-right'>
        <Button onClick={toggle}>Ajouter un membre</Button>
      </div>
      <Suspense fallback={<ComponentLoading />}>
        <LoadJuryMembers reload={reload} />
      </Suspense>
      <Modal open={open} title='Ajouter un membre'>
        <AddJuryMember
          exam={id ?? ''}
          onFinish={() => {
            setOpen(false);
            reload();
          }}
        />
      </Modal>
    </div>
  );
}

export default JuryMembers;
