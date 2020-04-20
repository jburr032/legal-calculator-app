import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Components/styles.css";
import CalendarHomePage from "./CalendarHomePage";
const App = () => {
  return (
    <Router>
      <Route exact path='/uk' component={CalendarHomePage} />
    </Router>
  );
};

export default App;
