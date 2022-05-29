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
import { languageLnList } from '../../../../services/providers/store/atoms/departement.atom';
import AddLanguage from './AddLanguage';

function LoadLanguages({ reload }: { reload: any }) {
  const { id } = useParams();
  const departements = useRecoilValue(languageLnList(id ?? ''));
  const { setSelectedItems, hovered, ...tableProps } = useTable({
    values: departements,
    total: departements.length,
  });
  const [current, setCurrent] = useState<any>(null);

  const cols = useMemo(
    () => [{ label: 'Libellé de la langue', name: 'label' }],
    [hovered.id]
  );

  const removeItems = async (rows: any[]) => {
    await axios.post(
      config.api_url.defrecrutLn + 'languages/archive',
      rows.map((row) => row.id)
    );
    reload();
  };

  if (departements.length === 0)
    return (
      <div className="my-10">
        <EmptyState>Aucune langue trouvée</EmptyState>
      </div>
    );

  return (
    <div className="datatable my-8">
      <Table
        selection
        onRemoved={removeItems}
        cols={cols}
        rows={departements}
        {...tableProps}
      />

      <Modal open={!!current} title="Modifier la langue">
        <AddLanguage
          id={current ? current.id : null}
          exam={id ?? ''}
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

function LanguageLn() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { reload } = useQueryParams();

  const toggle = () => setOpen((open) => !open);

  return (
    <div>
      <div className="fs-20 bold">Langues</div>
      <div className="text-right">
        <Button onClick={toggle}>Ajouter une langue</Button>
      </div>
      <Suspense fallback={<ComponentLoading />}>
        <LoadLanguages reload={reload} />
      </Suspense>
      <Modal open={open} title="Ajouter une langue">
        <AddLanguage
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

export default LanguageLn;
