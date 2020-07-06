import { useTicks } from "../../../../hooks/gameTickHook";
import { EnvironmentContext } from "../../../../context/environmentContext";
import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { Environment } from "../../../../models/environment";
import GridRenderer from "../../../../shared/components/GridRenderer";
import RectRenderer from "../../../../shared/components/RectRenderer";

const useStyles = makeStyles({
  svg: {
    width: "100%",
    height: "10%",
  },
});

const EXAMPLE_LENGHT = 4;

/**
 * Component allowing to preview the speed of the player
 */
export function SpeedPreviewRenderer() {
  const style = useStyles();
  const [position, setPosition] = useState(0);
  const environmentContext = useContext(EnvironmentContext);
  const { environment } = environmentContext;
  useTicks(() => {
    if (position >= environment.width) {
      setPosition(0);
    } else {
      setPosition(position + 1);
    }
  });
  return (
    <svg
      className={style.svg}
      viewBox={`
        -${Environment.tileSize}
        0
        ${Environment.tileSize * environment.width + 2 * Environment.tileSize}
        ${Environment.tileSize}`}
    >
      <GridRenderer width={environment.width} height={1}></GridRenderer>
      {Array.from(Array(EXAMPLE_LENGHT).keys()).map((index) => (
        <RectRenderer
          color={"green"}
          key={index}
          x={
            position + index >= environment.width
              ? position + index - environment.width
              : position + index
          }
          y={0}
          rotate={180}
        ></RectRenderer>
      ))}
    </svg>
  );
}
