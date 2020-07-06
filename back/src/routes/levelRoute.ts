import { Router } from 'express';
import {
  postLevel,
  getAllLevels,
  getLevelById,
  updateLevel,
  deleteLevelByID,
  postScore,
} from '../controllers/levelsController';

export const levelRouter = Router();

levelRouter.get('/all', getAllLevels);
levelRouter.get('/:id', getLevelById);

levelRouter.post('/', postLevel);
levelRouter.post('/:id', updateLevel);
levelRouter.post('/score/:id', postScore);

levelRouter.delete('/:id', deleteLevelByID);

