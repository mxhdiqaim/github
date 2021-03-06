import React, { useState, useReducer } from 'react'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext';

const Search = ({ showClear, clearUsers, setAlert }) => {

    const [text, setText] = useState('');

    const onChange = e => setText(e.target.value);
    
    const onSubmit = e => {
        e.preventDefault();
        if(text === '') {
            setAlert('Please enter something...', 'light')
        } else {
            searchUsers(text)
        }
    }
    
        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input 
                        type="text" 
                        name="text" 
                        placeholder="Search Users..." 
                        value={text}
                        onChange={onChange}
                    />    
                    <input 
                        type="submit" 
                        value="Search" 
                        className='btn btn-dark btn-block'
                    />
                </form>   
                {showClear && 
                    <button 
                        className="btn btn-light btn-block" 
                        onClick={clearUsers} 
                    >Clear</button>
                }
            </div>
        )
}

Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
}

export default Search
