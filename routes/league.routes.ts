import express from 'express';
import { getAllLeagues } from '../controllers/leagueController';

const router = express.Router();

router.get('/', getAllLeagues);

export default router;
