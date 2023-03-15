export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Country = {
  id: string;
  name: string;
  iso: string;
  flagUrl: string;
};

export type Gameday = {
  id: string;
  number: number;
  season: string;
};

export type League = {
  id: string;
  name: string;
};

export type Club = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  primaryColor: string;
  secondaryColor: string;
  stadium: string;
  address: string;
  city: string;
};

export type Team = {
  id: string;
  name: string;
  clubId: string;
  leagueId: string;
  club?: Club
};

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

export type Game = {
  id: string;
  gamedayId: string;
  reffereeName: string;
  date: Date;
  homeTeamId: string;
  awayTeamId: string;
};

export type GameEvent = {
  id: string;
  minute: number;
  event: string;
  activePlayerId: string;
  passivePlayerId: string;
  gameId: string;
};