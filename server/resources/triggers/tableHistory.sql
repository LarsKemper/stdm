DROP TRIGGER IF EXISTS tableHistoryTrigger;

CREATE TRIGGER tableHistoryTrigger BEFORE INSERT
    ON gameEvent FOR EACH ROW
    INSERT INTO tableHistory (
        leagueId,
        teamId           ,
        goalsShot,
        goalsGot,
        points,
        season,
        changeVer
    ) SELECT
        leagueId,
        teamId,
        goalsShot,
        goalsGot,
        points,
        season,
        (SELECT COUNT(*) FROM gameEvent)
    FROM leagueTable;