import React from 'react';
import { useParams } from 'react-router-dom';
import CandidatesList from '../candidates/CandidatesList';
import ExamDetails from '../exams/ExamDetails';
import ExamStats from '../exams/ExamStats';

function GlobalVue() {
  const { id } = useParams();

  return (
    <div>
      <ExamDetails id={id} />
      <ExamStats id={id} />
      <CandidatesList id={id} />
    </div>
  );
}

export default GlobalVue;
