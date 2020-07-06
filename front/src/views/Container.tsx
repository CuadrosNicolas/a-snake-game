import React from "react";
import GameEnvironment from "./pages/game/GameEnvironment";
import EditorWrapper from "./pages/editor/EditorWrapper";
import { Levels } from "./pages/level/Levels";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import companyLogo from "../resources/company-logo-full-70.png";
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  page: {
    width: "100",
    height: "calc(100% - 64px)",
  },
  tabs: {
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    borderLeftColor: "rgb(242,242,242)",
    paddingLeft: "1em",
    marginLeft: "1em",
  },
  logoWrapper: {
    flexGrow: 2,
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  logo: {
    width: "30px",
    height: "100%",
  },
});

/**
 * Application main layout and routing
 */
export default function Container() {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const tabChange = (_: React.ChangeEvent<{}>, path: string) => {
    history.push(path);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">A snake game</Typography>
          <Tabs
            className={classes.tabs}
            value={location.pathname}
            onChange={tabChange}
            aria-label="simple tabs example"
          >
            <Tab label="Niveaux" value={"/"} />
            <Tab label="Editeur" value={"/editor"} />
          </Tabs>
          <div className={classes.logoWrapper}>
            <img
              alt="Company logo"
              className={classes.logo}
              src={companyLogo}
            ></img>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.page}>
        <Switch>
          <Route path="/party/:id">
            <GameEnvironment />
          </Route>
          <Route path="/editor/:id?">
            <EditorWrapper />
          </Route>
          <Route path="/">
            <Levels />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
