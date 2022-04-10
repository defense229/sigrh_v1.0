import React from 'react';
import { CandidateQueryType } from '../../../services/types/candidates.types';
import CandidateTemplate from './CandidateTemplate';

export function CandidatesSportReject() {
  return <CandidateTemplate type={CandidateQueryType.sport_rejected} />;
}
export default CandidatesSportReject;
