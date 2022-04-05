import { atom } from 'recoil';
import { IExam } from '../../../libs/exams';

export const examStateAtom = atom<IExam[]>({
  key: 'exam-store-state',
  default: [],
});
