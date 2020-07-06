import { Level } from "../../../../models/level";
import React from "react";
import PlayerPreviewRenderer from "./PlayerPreviewRenderer";
import WallsPreviewRenderer from "./WallsPreviewRenderer";
import { SvgCanvas } from "../../../../shared/components/SvgCanvas";
import GridRenderer from "../../../../shared/components/GridRenderer";

export interface LevelPreviewRendererProps {
  level: Level;
}

/**
 * Render a whole level preview
 * @param props
 */
export function LevelPreviewRenderer(props: LevelPreviewRendererProps) {
  return (
    <SvgCanvas width={props.level.width} height={props.level.height}>
      <GridRenderer
        width={props.level.width}
        height={props.level.height}
      ></GridRenderer>
      <PlayerPreviewRenderer
        x={props.level.player.x}
        y={props.level.player.y}
      ></PlayerPreviewRenderer>
      <WallsPreviewRenderer walls={props.level.walls}></WallsPreviewRenderer>
    </SvgCanvas>
  );
}
