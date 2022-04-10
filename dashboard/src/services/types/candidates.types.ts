export enum CandidateQueryType {
  accepted = 'accepted',
  rejected = 'rejected',
  sport_present = 'sport-present',
  sport_absent = 'sport-absent',
  sport_accepted = 'sport-accepted',
  sport_rejected = 'sport-rejected',
}

export type TCandidateQuery = {
  id: string;
  type: CandidateQueryType;
};

export enum CandidateStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export type TStatusCandidate = 'NEW' | 'ACCEPTED' | 'REJECTED';
