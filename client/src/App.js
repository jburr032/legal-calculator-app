import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./Components/styles.css";
import CalendarHomePage from "./CalendarHomePage";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact to='/uk' component={CalendarHomePage} />
      </Switch>
    </Router>
  );
};

export default App;
