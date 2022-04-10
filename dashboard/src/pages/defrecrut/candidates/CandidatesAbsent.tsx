import React from 'react';
import { CandidateQueryType } from '../../../services/types/candidates.types';
import CandidateTemplate from './CandidateTemplate';

export function CandidatesAbsent() {
  return <CandidateTemplate type={CandidateQueryType.sport_absent} />;
}
export default CandidatesAbsent;
