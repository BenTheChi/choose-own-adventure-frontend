export interface User {
  name: string;
  isHost: boolean;
  hasVoted: boolean;
  choice: CHOICE;
}

export enum CHOICE {
  OPTION_1,
  OPTION_2,
  OPTION_3,
  OPTION_4
}

export interface ChoiceSelected {
  choice: CHOICE;
  user: User;
}