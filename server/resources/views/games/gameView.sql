CREATE VIEW gameView
AS 
SELECT 
    id, 
    hometeamId, 
    awayteamId, 
    date,
    reffereeName,
    number,
    season,

FROM
    game
INNER JOIN
    gameday ON gameday.id = game.gamedayId
INNER JOIN
    team AS homeTeam ON homeTeam.id = game.hometeamId, 
INNER JOIN
    team AS awayTeam ON awayTeam.id = game.awayteamId, 