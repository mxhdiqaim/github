import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';


const User = () => {

    const githubContext = useContext(GithubContext);

    const { user, loading, repos, getUser, getUserRepos, match , getUser, getUserRepos} = githubContext;

    
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    }, [])


        const { 
            login,
            name,
            avatar_url,
            location,
            bio,
            blog,
            html_url,
            followers,
            following,
            public_gist,
            company,
            public_repos,
            hireable
         } = user;
        
         if (loading) return <Spinner />
        return (
            <Fragment>
              <Link to='/' className='btn btn-light'>Back To Search</Link>
              Hireable {' '} { hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" /> }
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className='round-img' style={{ width: '150px' }} alt=""/>
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                            )}
                            <a href={html_url} className="btn btn-dark my-1">Visit Github Profile </a>
                            <ul>
                                <li>
                                    {login && (
                                        <Fragment>
                                            <strong>Username: </strong>{login}
                                        </Fragment>
                                    )}
                                </li>
                                <li>
                                    {company && (
                                        <Fragment>
                                            <strong>Company: </strong>{company}
                                        </Fragment>
                                    )}
                                </li>
                                <li>
                                    {blog && (
                                        <Fragment>
                                            <strong>Website: </strong>{blog}
                                        </Fragment>
                                    )}
                                </li>
                            </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Follwing: {following}</div>
                    <div className="badge badge-light">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gist: {public_gist}</div>
                </div>
                <Repos repos={repos} />
            </Fragment>
        )
}

// User.propTypes = {
//     loading: PropTypes.bool,
//     getUser: PropTypes.func.isRequired,
//     user: PropTypes.object.isRequired,
//     getUserRepos: PropTypes.func.isRequired,
//     repos: PropTypes.array.isRequired,
// }

export default User;
