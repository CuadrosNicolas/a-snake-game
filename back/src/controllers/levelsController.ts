import { levelService } from '../services/levelsService';
import { LevelDto } from '../models/dto/LevelDto';
import { Levels, PartyResult } from '../repositories/levelRepository';
import { HttpError } from '../utils/httpError';


export const getAllLevels = (req: any, res: any) => {
  levelService.getAllLevels()
    .then((level) => res.send(level))
    .catch((error: HttpError) => res.status(error.status).send(error));
};

export const updateLevel = (req: any, res: any) => {
  levelService.updateLevel(req.params['id'] as string, req.body as LevelDto)
    .then((level) => res.send(level))
    .catch((error: HttpError) => res.status(error.status).send(error));
};

export const postLevel = (req: any, res: any) => {
  levelService.postLevel(req.body as LevelDto)
    .then((level) => res.send(level))
    .catch((error: HttpError) => res.status(error.status).send(error));
};

export const getLevelById = (req: any, res: any) => {
  levelService.getLevelById(req.params['id'] as string)
    .then((level) => res.send(level))
    .catch((error: HttpError) => res.status(error.status).send(error));
};

export const deleteLevelByID = (req: any, res: any) => {
  levelService.deleteLevelById(req.params['id'] as string)
    .then((level) => res.send(level))
    .catch((error: HttpError) => res.status(error.status).send(error));
};

export const postScore = (req: any, res: any) => {
  levelService.postScore(req.params['id'] as string, req.body as PartyResult)
    .then((level) => res.send(level))
    .catch((error: HttpError) => res.status(error.status).send(error));
};
