import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./Components/styles.css";
import CalendarHomePage from "./CalendarHomePage";
import { withOrientationChange } from "react-device-detect";

const App = (props) => {
  const { isPortrait } = props;
  return (
    <Router>
      <Switch>
        <Route exact to='/uk' component={CalendarHomePage} />
      </Switch>
      {isPortrait && <h1>Hello</h1>}
    </Router>
  );
};

export default withOrientationChange(App);
