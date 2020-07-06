
import { ILevel, Levels } from '../../repositories/levelRepository';
import { LevelDto } from '../dto/LevelDto';

/**
 * @param  {IClient} client
 */
export function mapLevelToLevelDto(level: ILevel) {
  return new LevelDto(level.width, level.height, level.player,
    level.walls, level.refreshRate, level.gameMode,
    level.name, level.playerResults, level.id);
}


/**
 * @param  {ClientDto} client
 */
export async function mapLevelDtoToLevel(levelDto: LevelDto) {
  delete levelDto.id;
  return new Levels(levelDto);
}
