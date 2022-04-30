export interface IJury {
  numero?: string;
  exam?: string;
}

export interface IMember {
  username?: string;
  password?: string;
  departement?: string;
  jury?: string;
  exam?: string;
  role?: JuryMemberRole;
}

export enum JuryMemberRole {
  MEMBER = 'MEMBER',
  PRESIDENT = 'PRESIDENT',
}
