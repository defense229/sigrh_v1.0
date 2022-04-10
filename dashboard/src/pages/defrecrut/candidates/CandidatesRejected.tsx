import React from 'react';
import { CandidateQueryType } from '../../../services/types/candidates.types';
import CandidateTemplate from './CandidateTemplate';

export function CandidatesRejected() {
  return <CandidateTemplate type={CandidateQueryType.rejected} />;
}
export default CandidatesRejected;
