import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
    }
    
    static propTypes = {
        loading: PropTypes.bool,
        getUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }
    
    render() {

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
            public_repos,
            hireable
         } = this.props.user;

         const { loading } = this.props;
        
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
                </div>
            </Fragment>
        )
    }
}

export default User
