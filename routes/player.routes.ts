import express from 'express';
import { getAllPlayers, getPlayer } from '../controllers/playerController';

const router = express.Router();

router.get('/:playerId', getPlayer);
router.get('/', getAllPlayers);

export default router;
