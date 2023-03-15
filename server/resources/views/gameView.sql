DROP VIEW IF EXISTS gameView;
CREATE VIEW gameView AS
    SELECT
    game.id AS id,
    homeTeam.id AS homeTeamId,
    homeTeam.name AS homeTeam,
    awayTeam.id AS awayTeamId,
    awayTeam.name AS awayTeam,
    homeClub.name AS homeClub,
    homeClub.logoUrl AS homeClubLogo,
    awayClub.name AS awayClub,
    awayClub.logoUrl AS awayClubLogo,
    homeClub.stadium AS stadium,
    homeClub.address AS address,
    homeEvents.goals AS homeGoals,
    awayEvents.goals AS awayGoals,
    game.date AS date,
    game.reffereeName AS reffereeName,
    gameday.number AS gameday,
    gameday.season AS season
    FROM
    game
    INNER JOIN
    gameday ON gameday.id = game.gamedayId
    INNER JOIN
    team AS homeTeam ON homeTeam.id = game.hometeamId
    INNER JOIN
    team AS awayTeam ON awayTeam.id = game.awayteamId
    INNER JOIN
    club AS homeClub ON homeTeam.clubId = homeClub.id
    INNER JOIN
    club AS awayClub ON awayTeam.clubId = awayClub.id
    LEFT JOIN
    gameGoalTeamView AS homeEvents On game.id = homeEvents.gameId AND game.hometeamId = homeEvents.teamId
    LEFT JOIN
    gameGoalTeamView AS awayEvents ON game.id = awayEvents.gameId AND game.awayteamId = awayEvents.teamId
;