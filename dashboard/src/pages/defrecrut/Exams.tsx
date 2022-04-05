import React, { useState } from 'react';
import Button from '../../components/Buttons/Button';
import Modal from '../../components/Modals/Modal';
import PageLoading from '../../components/Progress/PageLoading';
import EmptyState from '../../components/Utils/EmptyState/EmptyState';
import { config } from '../../env';
import { useFetch } from '../../services/hooks/useFetch';
import { IExam } from '../../services/libs/exams';
import AddExam from './AddExam';

function Exams() {
  const [loading, exams, error] = useFetch<IExam[]>({
    url: config.api_url.sigrh + 'exams',
  });
  const [isAddingExam, setIsAdminExam] = useState(false);

  if (loading) return <PageLoading />;

  if (error) alert(JSON.stringify(error));

  if (exams && Array.isArray(exams) && exams.length === 0) {
    return (
      <div>
        <div className="fs-20 bold mb-30">Examens</div>
        <EmptyState>
          <div className="text-center">
            <div className="my-20">
              Vous n’avez aucun examen disponible actuellement.
            </div>
            <Button onClick={() => setIsAdminExam(true)}>
              Créer un nouvel examen
            </Button>
          </div>
        </EmptyState>
        <Modal
          open={isAddingExam}
          title="Créer un nouveau examen"
          onClose={() => setIsAdminExam(false)}
        >
          <AddExam
            onFinish={() => {
              setIsAdminExam(false);
            }}
          />
        </Modal>
      </div>
    );
  }

  return <div>Exams</div>;
}

export default Exams;
