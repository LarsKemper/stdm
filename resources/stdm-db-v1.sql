CREATE TABLE IF NOT EXISTS users
  (
     id        INT auto_increment PRIMARY KEY,
     firstName VARCHAR(50) NOT NULL,
     lastName  VARCHAR(50) NOT NULL,
     email     VARCHAR(255) UNIQUE NOT NULL,
     password  VARCHAR(255) NOT NULL,
     role      ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
     enabled   BOOLEAN NOT NULL DEFAULT TRUE,
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
  );

CREATE TABLE IF NOT EXISTS resetTokens
  (
     id        INT auto_increment PRIMARY KEY,
     userId    INT NOT NULL,
     token     VARCHAR(255) NOT NULL,
     expiresAt TIMESTAMP NOT NULL,
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
     FOREIGN KEY(userId) REFERENCES users(id)
  );

CREATE TABLE IF NOT EXISTS teams
  (
     id             INT auto_increment PRIMARY KEY,
     name           VARCHAR(50) NOT NULL,
     officialName   VARCHAR(255) NOT NULL,
     stadium        VARCHAR(50) NOT NULL,
     founded        VARCHAR(4) NOT NULL,
     primaryColor   VARCHAR(7) NOT NULL,
     secondaryColor VARCHAR(7) NOT NULL,
     address        VARCHAR(255) NOT NULL,
     city           VARCHAR(50) NOT NULL,
     instagram      VARCHAR(255),
     facebook       VARCHAR(255),
     twitter        VARCHAR(255),
     website        VARCHAR(255),
     logoUrl        VARCHAR(255) NOT NULL,
     statidumUrl    VARCHAR(255) NOT NULL,
     createdAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
     updatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE
     CURRENT_TIMESTAMP()
  );

CREATE TABLE IF NOT EXISTS countries
  (
     id      INT auto_increment PRIMARY KEY,
     name    VARCHAR(50) NOT NULL,
     iso     VARCHAR(2) NOT NULL,
     flagUrl VARCHAR(255)
  );

CREATE TABLE IF NOT EXISTS players
  (
     id        INT auto_increment PRIMARY KEY,
     userId    INT NOT NULL,
     teamId    INT NOT NULL,
     countryId INT NOT NULL,
     positon   VARCHAR(50) NOT NULL,
     number    INT NOT NULL,
     height    INT NOT NULL,
     weight    INT NOT NULL,
     birthDate DATE NOT NULL,
     avatarUrl VARCHAR(255) NOT NULL,
     FOREIGN KEY(userId) REFERENCES users(id),
     FOREIGN KEY(teamId) REFERENCES teams(id),
     FOREIGN KEY(countryId) REFERENCES countries(id)
  );

CREATE TABLE IF NOT EXISTS gamedays
  (
     id     INT auto_increment PRIMARY KEY,
     number INT NOT NULL,
     date   DATE NOT NULL,
     season VARCHAR(9) NOT NULL
  );

CREATE TABLE IF NOT EXISTS games
  (
     id           INT auto_increment PRIMARY KEY,
     hometeamId   INT NOT NULL,
     awayteamId   INT NOT NULL,
     gamedayId    INT NOT NULL,
     reffereeName VARCHAR(50) NOT NULL,
     FOREIGN KEY(hometeamId) REFERENCES teams(id),
     FOREIGN KEY(awayteamId) REFERENCES teams(id),
     FOREIGN KEY(gamedayId) REFERENCES gamedays(id)
  );

CREATE TABLE IF NOT EXISTS gameevents
  (
     id        INT auto_increment PRIMARY KEY,
     gameId    INT NOT NULL,
     minute    INT NOT NULL,
     event     VARCHAR(50) NOT NULL,
     payload   JSON,
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
     FOREIGN KEY(gameId) REFERENCES games(id)
  ); 