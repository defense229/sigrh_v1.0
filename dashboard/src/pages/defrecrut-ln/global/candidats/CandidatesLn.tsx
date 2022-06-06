import axios from 'axios';
import React, { Suspense, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Button from '../../../../components/Buttons/Button';
import Dropdown from '../../../../components/Dropdowns/Dropdown';
import Modal from '../../../../components/Modals/Modal';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import DataTable from '../../../../components/Tables/DataTable';
import EmptyState from '../../../../components/Utils/EmptyState/EmptyState';
import Flex from '../../../../components/Utils/Flex/Flex';
import { config } from '../../../../env';
import useChangePageSize from '../../../../services/hooks/useChangePageSize';
import { useFetch } from '../../../../services/hooks/useFetch';
import { useQueryParams } from '../../../../services/hooks/useQueryParams';
import { useTable } from '../../../../services/hooks/useTable';
import { xlsxUpload } from '../../../../services/libs';
import { candidatLnList } from '../../../../services/providers/store/atoms/departement.atom';
import AddCandidatLn from './AddCandidatLn';

function LoadCandidat({ reload }: { reload: any }) {
  const { id } = useParams();
  const candidats = useRecoilValue(candidatLnList(id ?? ''));
  const { setSelectedItems, hovered, ...tableProps } = useTable(candidats);
  const [current, setCurrent] = useState<any>(null);
  const changePageSize = useChangePageSize();

  const cols = useMemo(
    () => [
      { label: 'Numéro de table', name: 'numero' },
      {
        label: 'Département',
        render: (row: any) => <div>{row.departement.label}</div>,
      },
      { label: 'Nom', name: 'nom' },
      { label: 'Prénom', name: 'prenom' },
      { label: 'Genre', name: 'sexe' },
      {
        label: 'Date de naissance',
        name: 'dateNaissance',
      },
      { label: 'Age', name: 'age' },
    ],
    [hovered.id]
  );

  const removeItems = async (rows: any[]) => {
    await axios.post(
      config.api_url.defrecrutLn + 'jury/archive-candidats',
      rows.map((row) => row.id)
    );
    reload();
  };

  if (candidats.length === 0)
    return (
      <div className="my-10">
        <EmptyState>Aucun candidat trouvé</EmptyState>
      </div>
    );

  console.log(candidats);

  return (
    <div className="datatable my-8">
      <DataTable
        selection
        onRemoved={removeItems}
        cols={cols}
        rows={candidats.values}
        {...tableProps}
        onPageSizeChanged={(size: number) => changePageSize(size)}
      />

      <Modal open={!!current} title="Modifier la question">
        <AddCandidatLn
          id={current ? current.id : null}
          exam={id ?? ''}
          candidat={current ? current : null}
          onFinish={() => {
            setCurrent(null);
            reload();
          }}
        />
      </Modal>
    </div>
  );
}

function CandidatesLn() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { reload } = useQueryParams();
  const [_, departements] = useFetch({
    url: config.api_url.defrecrutLn + 'departements/exam/' + id,
  });

  const toggle = () => setOpen((open) => !open);

  const uploadCandidate = async () => {
    const data: any = await xlsxUpload();
    const candidates = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i][7])
        candidates.push({
          nom: data[i][1].trim(),
          prenom: data[i][2].trim(),
          sexe: data[i][3].trim() === 'M' ? 'H' : data[i][3].trim(),
          dateNaissance: data[i][8].trim() ?? '',
          telephone: String(data[i][5]).split('-').join('').trim() ?? '',
          age: Number(data[i][6]) ?? 0,
          departement: data[i][7],
          exam: id,
          numero: i + 202,
        });
    }
    await Promise.all(
      candidates.map((candidate) =>
        axios.post(config.api_url.defrecrutLn + 'candidats', candidate)
      )
    );
    reload();
  };

  return (
    <div>
      <div className="fs-20 bold">Candidats</div>
      <div className="text-right flex my-10 justify-end">
        <Button onClick={toggle}>Ajouter un candidat</Button>
        <Button outlined className="ml-4" onClick={uploadCandidate}>
          Importer un fichier
        </Button>
        <Dropdown
          dropdown={
            <Flex direction="col" gap="10px">
              {departements?.map((item: any, index: number) => (
                <div
                  className="hover-u cursor-pointer"
                  onClick={() => {
                    window.open(
                      config.api_url.defrecrutLn +
                        'candidats/download-list-xlsx/' +
                        id +
                        '?departement=' +
                        item.id
                    );
                  }}
                  key={index}>
                  {item.label}
                </div>
              ))}
            </Flex>
          }>
          <Button outlined className="ml-4">
            Télécharger la liste
          </Button>
        </Dropdown>
      </div>
      <Suspense fallback={<ComponentLoading />}>
        <LoadCandidat reload={reload} />
      </Suspense>
      <Modal open={open} title="Ajouter un candidat">
        <AddCandidatLn
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

export default CandidatesLn;
