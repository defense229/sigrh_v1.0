import React, { Suspense, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import Topbar from '../../../components/Layout/Topbar/Topbar';
import Modal from '../../../components/Modals/Modal';
import PageLoading from '../../../components/Progress/PageLoading';
import SvgEdit from '../../../components/Svgs/SvgEdit';
import SvgEye from '../../../components/Svgs/SvgEye';
import DataTable from '../../../components/Tables/DataTable';
import Container from '../../../components/Utils/Containers/Container';
import Flex from '../../../components/Utils/Flex/Flex';
import { ErrorBoundary } from '../../../components/Utils/Others/ErrorBoundary';
import StatusDisplay from '../../../components/Utils/Others/StatusDisplay';
import { useAuth } from '../../../services/hooks/useAuth';
import { ExamStatus, IExam } from '../../../services/types/exams.types';
import { IUser } from '../../../services/types/login.types';
import NotFoud from '../../NotFoud';
import AddExam from './AddExam';
import EmptyExam from './EmptyExam';
import { useExam } from './useExam';

function LoadExams({ isAddingExam, setIsAdminExam }: any) {
  const {
    closeIsAdmin,
    removeItems,
    handleClose,
    handleFinish,
    currentExam,
    setCurrentExam,
    isSearching,
    exams,
    closeToast,
    ...tableProps
  } = useExam(setIsAdminExam);
  const { selectedItems, hovered, ...props } = tableProps;
  const navigate = useNavigate();

  const cols = useMemo(
    () => [
      { label: 'ID de l’examen', name: 'id' },
      { label: 'Libellé', name: 'label' },
      { label: 'Date de la création', name: 'at' },
      {
        label: 'Statut',
        render: (row: IExam) => (
          <StatusDisplay value={row.status ? row.status : ExamStatus.NEW} />
        ),
      },
      {
        label: '',
        render: (row: IExam) => (
          <Flex items="center">
            <div
              className={`pr-3 mr-3 ${
                row.id === hovered.id ? 'visible' : 'not-visible'
              }`}
              style={{ borderRight: 'solid 1px rgba(0,0,0,0.15)' }}
            >
              <SvgEdit onClick={() => setCurrentExam(() => row)} />
            </div>

            <div>
              {row.id === hovered.id ? (
                <SvgEye
                  onClick={() => {
                    navigate('/exam/' + row.id);
                  }}
                  color="#0185FF"
                />
              ) : (
                ''
              )}
            </div>
          </Flex>
        ),
      },
    ],
    [hovered.id, setCurrentExam, navigate]
  );

  if (exams.error) return <NotFoud />;

  if (exams.total === 0 && !isSearching)
    return (
      <EmptyExam isAddingExam={isAddingExam} setIsAdminExam={closeIsAdmin} />
    );

  if (exams && exams.values) {
    return (
      <div>
        <DataTable
          selection
          cols={cols}
          rows={exams.values.map((exam: IExam) => ({
            id: exam.id ? exam.id : '',
            label: exam.label,
            at: new Date(exam.createdAt ?? '')
              .toLocaleString()
              .split(', ')
              .join(' à '),
            status: exam.status,
          }))}
          onToastClosed={closeToast}
          selectedItems={selectedItems}
          onRemoved={removeItems}
          {...props}
        />
        <Modal
          open={isAddingExam || !!currentExam}
          title={
            !!currentExam ? "Modifier l'examen" : 'Créer un nouveau examen'
          }
          onClose={handleClose}
        >
          <AddExam value={currentExam as IExam} onFinish={handleFinish} />
        </Modal>
      </div>
    );
  }

  return <></>;
}

function Exams() {
  const [isAddingExam, setIsAdminExam] = useState(false);
  const [, user] = useAuth();

  return (
    <div className="bg-light h-page">
      <Topbar user={user as IUser} />
      <Container>
        <Flex className="my-20" justify="between" items="center">
          <div className="fs-20 bold">Examens</div>
          <Button onClick={() => setIsAdminExam(true)}>
            Créer un nouvel examen
          </Button>
        </Flex>
        <Suspense fallback={<PageLoading />}>
          <ErrorBoundary>
            <LoadExams
              isAddingExam={isAddingExam}
              setIsAdminExam={setIsAdminExam}
            />
          </ErrorBoundary>
        </Suspense>
      </Container>
    </div>
  );
}

export default Exams;
