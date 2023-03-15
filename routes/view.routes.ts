import express from 'express';
import {getGames, getTable} from '../controllers/viewController';

const router = express.Router();

router.get('/table/:leagueId', getTable);
router.get('/games/:teamId', getGames)

export default router;
