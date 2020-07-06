import { LevelDto } from '../models/dto/LevelDto';
import { Levels, PartyResult } from '../repositories/levelRepository';
import { mapLevelToLevelDto } from '../models/mapper/levelMapper';
import { HttpError } from '../utils/httpError';


export function getAllLevels(): Promise<LevelDto[]> {
  return Levels.find()
    .then((levels) => levels.map(mapLevelToLevelDto))
    .then((levels) => Promise.all(levels));
}

export function updateLevel(id: string,
  level: LevelDto): Promise<LevelDto> {
  return Levels.findOneAndUpdate({ _id: id }, {
    name: level.name,
    width: level.width,
    height: level.height,
    walls: level.walls,
    gameMode: level.gameMode,
    player: level.player,
    refreshRate: level.refreshRate,
  }).then((level) => {
    if (!level) {
      throw new HttpError(400, 'Ressource inconnue');
    } else {
      return level;
    }
  }).then(mapLevelToLevelDto);
}


export function postLevel(level: LevelDto) {
  return Levels.create(new Levels(level))
    .then((level) => {
      if (!level) {
        throw new HttpError(400, 'Erreur lors de la création de la ressource');
      } else {
        return level;
      }
    })
    .then(mapLevelToLevelDto)
    .catch(() => {
      throw new HttpError(400, 'Erreur lors de la création de la ressource');
    });
}

export function getLevelById(id: string): Promise<LevelDto> {
  return Levels.findById(id).then((level) => {
    if (!level) {
      throw new HttpError(400, 'Ressource inconnue');
    } else {
      return level;
    }
  }).then(mapLevelToLevelDto).catch(() => {
    throw new HttpError(400, 'Ressource inconnue');
  });
}


export function deleteLevelById(id: string)
  : Promise<{ ok?: number, n?: number; }> {
  return Levels.deleteOne({ _id: id }).then((level) => {
    if (!level) {
      throw new HttpError(400, 'Ressource inconnue');
    } else {
      return level;
    }
  });
}

export function postScore(id: string, playerResult: PartyResult)
  : Promise<LevelDto> {
  return Levels.findById(id).then((level) => {
    if (!level) {
      throw new HttpError(400, 'Ressource inconnue');
    } else {
      return level;
    }
  }).then((level) => {
    if (level) {
      return Levels
        .findOneAndUpdate({ _id: id },
          { playerResults: [...level.playerResults, playerResult] })
        .catch(() => {
          throw new HttpError(400, 'Erreur lors de la mise à jour');
        });
    } else {
      return null;
    }
  })
    .catch(() => {
      throw new HttpError(400, 'Ressource inconnue');
    }).then(mapLevelToLevelDto);
}

export const levelService = {
  getAllLevels,
  postLevel,
  updateLevel,
  deleteLevelById,
  getLevelById,
  postScore,
};
