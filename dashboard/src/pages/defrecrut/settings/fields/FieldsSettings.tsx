import axios from 'axios';
import React, { Suspense, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Button from '../../../../components/Buttons/Button';
import Dropdown from '../../../../components/Dropdowns/Dropdown';
import Modal from '../../../../components/Modals/Modal';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import SvgEdit from '../../../../components/Svgs/SvgEdit';
import SvgMore from '../../../../components/Svgs/SvgMore';
import SvgPencilCircle from '../../../../components/Svgs/SvgPencilCircle';
import Table from '../../../../components/Tables/Table';
import EmptyState from '../../../../components/Utils/EmptyState/EmptyState';
import Flex from '../../../../components/Utils/Flex/Flex';
import IconWithLabel from '../../../../components/Utils/Others/IconWithLabel';
import { config } from '../../../../env';
import { useQueryParams } from '../../../../services/hooks/useQueryParams';
import { useTable } from '../../../../services/hooks/useTable';
import { fieldList } from '../../../../services/providers/store/atoms/field.atom';
import AddField from './AddField';

function LoadFields({ reload }: { reload: any }) {
  const { id } = useParams();
  const fields = useRecoilValue(fieldList(id ?? ''));
  const { setSelectedItems, hovered, ...tableProps } = useTable({
    values: fields,
    total: fields.length,
  });
  const [current, setCurrent] = useState<any>(null);
  const navigate = useNavigate();

  const cols = useMemo(
    () => [
      { label: 'Libellé', name: 'label' },
      { label: 'Coefficient', name: 'coefficient' },
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
                        onClick={() =>
                          navigate(`/exam/${id}/add-score/${row.id}`)
                        }
                        icon={<SvgPencilCircle />}
                        label='Saisir les notes'
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
    [hovered.id, id, navigate]
  );

  const removeItems = async (rows: any[]) => {
    await axios.post(
      config.api_url.sigrh + 'departements/archive',
      rows.map((row) => row.id)
    );
    reload();
  };

  if (fields.length === 0)
    return (
      <div className='my-10'>
        <EmptyState>Aucune matière trouvée</EmptyState>
      </div>
    );

  return (
    <div className='datatable my-8'>
      <Table
        onRemoved={removeItems}
        selection
        cols={cols}
        rows={fields}
        {...tableProps}
      />

      <Modal
        open={!!current}
        title='Modifier le centre d’examen'
        onClose={() => {
          setCurrent(null);
        }}>
        <AddField
          id={current ? current.id : null}
          exam={id ?? ''}
          label={current ? current.label : null}
          coefficient={current ? current.coefficient : null}
          onFinish={() => {
            setCurrent(null);
            reload();
          }}
        />
      </Modal>
    </div>
  );
}

function FieldsSettings() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { reload } = useQueryParams();

  const toggle = () => setOpen((open) => !open);

  return (
    <div>
      <div className='text-right'>
        <Button onClick={toggle}>Créer une matière</Button>
      </div>
      <Suspense fallback={<ComponentLoading />}>
        <LoadFields reload={reload} />
      </Suspense>
      <Modal open={open} title='Créer une matière'>
        <AddField
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

export default FieldsSettings;
