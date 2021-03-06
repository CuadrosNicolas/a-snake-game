import { Http } from '../shared/utils/http';
import { Level } from '../models/level';
import { PlayerResult } from '../models/playerResult';
import { Vector } from '../models/vector';

const url = `YOUR_IP_HERE`

/**
 * Funciton allowing to convert a level from the database
 * to real model
 * @param level
 */
function buildLevel(level: Level) {
  return new Level(level.width,
    level.height,
    new Vector(level.player.x, level.player.y),
    level.walls.map((wall) => new Vector(wall.x, wall.y)),
    level.refreshRate,
    level.gameMode,
    level.name,
    level.playerResults.map((playerResult) => new PlayerResult(playerResult.elapsedTicks, playerResult.score, playerResult.playerSpeudo)).sort(PlayerResult.compare),
    level.id);
}

/**
 * Return all levels
 */
function getAllLevels() {
  return Http.get<Level[]>(`${url}levels/all`).then(levels => levels.map(buildLevel))
}

/**
 * Add a level to the database
 * @param level
 */
function postLevel(level: Level) {
  return Http.post<Level>(`${url}levels`, level).then(buildLevel);
}

/**
 * Update a level
 * @param level
 */
function updateLevel(level: Level) {
  return Http.post<Level>(`${url}levels/${level.id}`, level).then(buildLevel);
}

/**
 * Delete a level
 * @param id
 */
function deleteLevel(id: string) {
  return Http.del<Level>(`${url}levels/${id}`)
}

/**
 * Find and return a level by its id
 * @param levelId
 */
function getLevelById(levelId: string) {
  return Http.get<Level>(`${url}levels/${levelId}`).then(buildLevel);
}

/**
 * Post the player result to the database
 * @param levelId
 * @param score 
 */
function postScore(levelId: string, score: PlayerResult) {
  return Http.post<Level>(`${url}levels/score/${levelId}`, score)

}

export const levelService = { getAllLevels, postLevel, getLevelById, updateLevel, deleteLevel, postScore };
