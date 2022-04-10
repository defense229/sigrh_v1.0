import React from 'react';
import { CandidateQueryType } from '../../../services/types/candidates.types';
import CandidateTemplate from './CandidateTemplate';

export function CandidateSportAccept() {
  return <CandidateTemplate type={CandidateQueryType.sport_accepted} />;
}
export default CandidateSportAccept;
