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


  useEffect(async () => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setLoading(false)
    setUsers(res.date)
    // eslint-disable-next-line
  }, [])
  
  // async componentDidMount() {
  //   this.setState({ loading: true })
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users: res.data, loading: false })
  // }

  // Search Users
  const searchUsers = async (text) => {
    // this.setState({ loading: true })
    setLoading(true)

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // this.setState({ users: res.data.items, loading: false })
    setLoading(false)
    setUsers(res.data.items)
  }

  // Get User
  const getUser = async (username) => {
    // this.setState({ loading: true })
    setLoading(true)


    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // this.setState({ user: res.data, loading: false })
    setLoading(false)
    setUser(res.data)

  }

  // Get User Repos
  const getUserRepos = async username => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading: false })
  }

  const showAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => this.setState({ alert: null }), 5000)
  }
  // Clear Users from state
  const clearUsers = () => this.setState({ users: [], loading: false })

    // const { users, user, loading, repos } = this.state;
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
                      searchUsers={this.searchUsers} 
                      clearUsers={this.clearUsers} 
                      showClear={users.length > 0 ? true : false}
                      showAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' render={props => (
                  <User { ...props } getUser={this.getUser} user={user} loading={loading} getUserRepos={this.getUserRepos} repos={repos} />
                )} />
            </Switch>
          </div>
        </div>
      </Router>
    )
}

export default App;
