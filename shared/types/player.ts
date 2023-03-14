export type Player = {
  id: string;
  name: string;
  position: 'ST' | 'CM' | 'CB' | 'GW';
  number: number;
  height: number;
  weight: number;
  birthDate: Date;
  avatarUrl: string;
  teamId: string;
  countryId: string;
};
