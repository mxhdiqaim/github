import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';


const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  useEffect(() => {
    setLoading(true);
    const func = async () => {
      const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

      setLoading(false)
      setUsers(res.data)
    }

    // eslint-disable-next-line
  }, [])


  // Search Users
  const searchUsers = async (text) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // this.setState({ users: res.data.items, loading: false })
    setUsers(res.data.items)
    setLoading(false)
  }

  // Get User
  const getUser = async (username) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data)
    setLoading(false)

  }

  // Get User Repos
  const getUserRepos = async username => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=15&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data)
    setLoading(false)
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 5000)
  }
  // Clear Users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false)
  }

    return (
      <Router>
        <div className="app">
          <Navbar />  
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                  <Fragment>
                    <Search 
                      searchUsers={searchUsers} 
                      clearUsers={clearUsers} 
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' render={props => (
                  <User { ...props } getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos} />
                )} />
            </Switch>
          </div>
        </div>
      </Router>
    )
}

export default App;
