import { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import GithubState from './context/github/GithubState';

const App = () => {
  
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 5000)
  }

    return (
      <GithubState>
        <Router>
          <div className="app">
            <Navbar />  
            <div className="container">
              <Alert alert={alert} />
              <Switch>
                <Route exact path='/' render={props => (
                    <Fragment>
                      <Search setAlert={showAlert} />
                      <Users loading={loading} />
                    </Fragment>
                  )} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/user/:login' render={props => (
                    <User 
                      { ...props }
                      // getUserRepos={getUserRepos} 
                      repos={repos} 
                    />
                  )} />
              </Switch>
            </div>
          </div>
        </Router>
      </GithubState>
    )
}

export default App;
