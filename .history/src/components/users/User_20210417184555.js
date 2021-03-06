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
            avaatr_url,
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

            </Fragment>
        )
    }
}

export default User
