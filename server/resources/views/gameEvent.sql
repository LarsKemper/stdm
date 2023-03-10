DROP VIEW IF EXISTS gameEventTeamView;
CREATE VIEW gameEventTeamView AS
    SELECT
    gameEvent.id,
    gameEvent.minute,
    gameEvent.activePlayer,
    gameEvent.passivePlayer,
    gameEvent.event,
    gameEvent.gameId,
    player.teamId
    FROM
    gameEvent
    INNER JOIN
    player ON gameEvent.activePlayer = player.id;

DROP VIEW IF EXISTS gameGoalTeamView;
CREATE VIEW gameGoalTeamView AS
    SELECT
    gameEventTeamView.teamId AS teamId,
    gameEventTeamView.gameId AS gameId,
    COUNT(gameEventTeamView.id) AS goals
    FROM
    gameEventTeamView
    WHERE gameEventTeamView.event = 'GOAL'
    GROUP BY gameEventTeamView.gameId, gameEventTeamView.teamId;