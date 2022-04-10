import React, { memo } from 'react';
import Button from '../../../components/Buttons/Button';
import Modal from '../../../components/Modals/Modal';
import EmptyState from '../../../components/Utils/EmptyState/EmptyState';
import AddExam from './AddExam';

type Props = {
  isAddingExam: boolean;
  setIsAdminExam: (x?: any) => any;
};

function EmptyExam({ isAddingExam, setIsAdminExam }: Props) {
  return (
    <div>
      {/* <div className="fs-20 bold mb-30">Examens</div> */}
      <EmptyState>
        <div className="text-center">
          <div className="my-20">
            Vous n’avez aucun examen disponible actuellement.
          </div>
          {/* <Button onClick={() => setIsAdminExam(true)}>
            Créer un nouvel examen
          </Button> */}
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

export default memo(EmptyExam);
