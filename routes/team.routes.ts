import express from 'express';
import {getAllTeams, getTeam} from '../controllers/teamController';

const router = express.Router();

router.get('/:teamId', getTeam);
router.get('/', getAllTeams);

export default router;
