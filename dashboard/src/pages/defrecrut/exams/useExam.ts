import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { config } from '../../../env';
import { useTable } from '../../../services/hooks/useTable';
import { examList } from '../../../services/providers/store/atoms/exam.atom';
import { IExam } from '../../../services/types';

export function useExam(setIsAdminExam: any) {
  const exams = useRecoilValue(examList);
  const { reload, setSelectedItems, ...tableProps } = useTable(exams);
  const [currentExam, setCurrentExam] = useState<IExam | { error: any } | null>(
    null
  );

  const closeIsAdmin = useCallback(
    (value: boolean) => {
      reload();
      setIsAdminExam(() => value);
    },
    [reload, setIsAdminExam]
  );

  const removeItems = async (rows: any[]) => {
    await axios.post(
      config.api_url.sigrh + 'exams/archive',
      rows.map((row) => row.id)
    );
    reload();
  };

  const handleClose = () => {
    setIsAdminExam(false);
    setCurrentExam(null);
  };

  const handleFinish = () => {
    closeIsAdmin(false);
    setCurrentExam(null);
  };

  const closeToast = () => {
    setSelectedItems([]);
  };

  return {
    closeIsAdmin,
    removeItems,
    handleClose,
    handleFinish,
    currentExam,
    setCurrentExam,
    exams,
    closeToast,
    ...tableProps,
  };
}
