import React from 'react';
import { CandidateQueryType } from '../../../services/types/candidates.types';
import CandidateTemplate from './CandidateTemplate';

export function CandidatesPresent() {
  return <CandidateTemplate type={CandidateQueryType.sport_present} />;
}
export default CandidatesPresent;
