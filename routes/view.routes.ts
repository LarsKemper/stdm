import express from 'express';
import {
  getGame,
  getGameEvents,
  getGames,
  getTable,
} from '../controllers/viewController';

const router = express.Router();

router.get('/table/:leagueId', getTable);
router.get('/games/:teamId', getGames);
router.get('/game/:gameId', getGame);
router.get('/game-events/:gameId', getGameEvents);

export default router;
