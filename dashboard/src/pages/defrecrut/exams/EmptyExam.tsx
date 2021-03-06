import React, { memo } from 'react';
import Modal from '../../../components/Modals/Modal';
import EmptyState from '../../../components/Utils/EmptyState/EmptyState';
import AddExam from './AddExam';

type Props = {
  isAddingExam: boolean;
  setIsAdminExam: (x?: any) => any;
  isLn?: boolean;
};

function EmptyExam({ isAddingExam, setIsAdminExam, isLn = false }: Props) {
  return (
    <div>
      <EmptyState>
        <div className="text-center">
          <div className="my-20">
            Vous n’avez aucun examen disponible actuellement.
          </div>
        </div>
      </EmptyState>
      <Modal
        open={isAddingExam}
        title="Créer un nouveau examen"
        onClose={() => setIsAdminExam(false)}
      >
        <AddExam
          isLn={isLn}
          onFinish={() => {
            setIsAdminExam(false);
          }}
        />
      </Modal>
    </div>
  );
}

export default memo(EmptyExam);
