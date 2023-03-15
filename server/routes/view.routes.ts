import express from 'express';
import { getTable } from '../controllers/viewController';

const router = express.Router();

router.get('/table/:leagueId', getTable);

export default router;
