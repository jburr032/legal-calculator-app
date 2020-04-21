import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Components/styles.css";
import CalendarHomePage from "./CalendarHomePage";

const App = (props) => {
  return (
    <Router>
      <Route exact to='/' component={CalendarHomePage} />
    </Router>
  );
};

export default App;
