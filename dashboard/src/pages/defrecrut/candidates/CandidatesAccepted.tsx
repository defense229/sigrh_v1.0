import React from 'react';
import { CandidateQueryType } from '../../../services/types/candidates.types';
import CandidateTemplate from './CandidateTemplate';

export function CandidatesAccepted() {
  return <CandidateTemplate type={CandidateQueryType.accepted} />;
}
export default CandidatesAccepted;
