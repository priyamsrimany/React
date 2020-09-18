import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import AddTutorial from "./Components/add-tutorial.component";

function App() {
  return (
    <div className="App">
     <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
          
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  Tutorials
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/add" component={AddTutorial} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
