DROP VIEW IF EXISTS leagueTable;
CREATE VIEW leagueTable AS
    SELECT
    leagueId AS leagueId,
    league.name AS leagueName,
    team.id AS teamId,
    team.name AS teamName,
    c.name AS clubName,
    (
        IFNULL(SUM(homeGameView.homeGoals), 0) +
        IFNULL(SUM(awayGameView.awayGoals), 0)
    ) AS goalsShot,
    (
        IFNULL(SUM(homeGameView.awayGoals), 0) +
        IFNULL(SUM(awayGameView.homeGoals), 0)
    ) AS goalsGot,
    (
        SELECT COUNT(*) FROM gameView WHERE gameView.homeTeamId = teamId AND gameView.homeGoals > gameView.awayGoals
    ) as homeWins,
    (
        SELECT COUNT(*) FROM gameView WHERE gameView.awayTeamId = teamId AND gameView.awayGoals > gameView.homeGoals
    ) as awayWins,
    (
        SELECT COUNT(*) FROM gameView WHERE gameView.homeTeamId = teamId OR gameView.awayTeamId = teamId AND gameView.homeGoals = gameView.awayGoals
    ) as draw,
    (
        SELECT COUNT(*) FROM gameView WHERE gameView.homeTeamId = teamId AND gameView.homeGoals < gameView.awayGoals
    ) as homeLosses,
    (
        SELECT COUNT(*) FROM gameView WHERE gameView.awayTeamId = teamId AND gameView.awayGoals < gameView.homeGoals
    ) as awayLosses,
    (
        SUM(
            CASE
            WHEN homeGameView.homeGoals > homeGameView.awayGoals THEN 3
            WHEN homeGameView.homeGoals = homeGameView.awayGoals THEN 1
            ELSE 0 END
            ) +
        SUM(
            CASE
            WHEN awayGameView.awayGoals > awayGameView.homeGoals THEN 3
            WHEN awayGameView.awayGoals = awayGameView.homeGoals THEN 1
            ELSE 0 END
            )
    ) AS points,
    gameday.season AS season
    FROM
    team
    INNER JOIN league league on team.leagueId = league.id
    INNER JOIN club c on team.clubId = c.id
    LEFT JOIN game homeGames on team.id = homeGames.hometeamId
    LEFT JOIN gameView homeGameView on homeGames.id = homeGameView.id
    LEFT JOIN game awayGames on team.id = awayGames.awayteamId
    LEFT JOIN gameView awayGameView on awayGames.id = awayGameView.id
    LEFT JOIN gameday on homeGames.gamedayId = gameday.id
    GROUP BY
    team.leagueId,
    team.id,
    gameday.season
;