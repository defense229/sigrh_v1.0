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
import { quetionsLnList } from '../../../../services/providers/store/atoms/departement.atom';
import AddQuestionLn from './AddQuestionLn';

function LoadQuestions({ reload }: { reload: any }) {
  const { id } = useParams();
  const departements = useRecoilValue(quetionsLnList(id ?? ''));
  const { setSelectedItems, hovered, ...tableProps } = useTable({
    values: departements,
    total: departements.length,
  });
  const [current, setCurrent] = useState<any>(null);

  const cols = useMemo(
    () => [
      {
        label: 'Numéro',
        render: (_: any, index: number = 0) => <div>{index + 1}</div>,
      },
      { label: 'Libellé', name: 'label' },
    ],
    [hovered.id]
  );

  const removeItems = async (rows: any[]) => {
    await axios.post(
      config.api_url.defrecrutLn + 'questions/archive',
      rows.map((row) => row.id)
    );
    reload();
  };

  if (departements.length === 0)
    return (
      <div className="my-10">
        <EmptyState>Aucune question trouvée</EmptyState>
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

      <Modal open={!!current} title="Modifier la question">
        <AddQuestionLn
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

function QuestionsLn() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { reload } = useQueryParams();

  const toggle = () => setOpen((open) => !open);

  return (
    <div>
      <div className="fs-20 bold">Questions</div>
      <div className="text-right">
        <Button onClick={toggle}>Ajouter une question</Button>
      </div>
      <Suspense fallback={<ComponentLoading />}>
        <LoadQuestions reload={reload} />
      </Suspense>
      <Modal open={open} title="Ajouter une question">
        <AddQuestionLn
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

export default QuestionsLn;
