import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = (props) => {

    const [readyToRender, setReadyToRender] = useState(true);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('token');

    const changeUsername = (event) => { setUsername(event.target.value); }
    const changePassword = (event) => { setPassword(event.target.value); }

    const clickLogin = (event) => {

        // prevent button from submitting the "form"
        event.preventDefault();

        if (username !== '' && password !== '') {


            axios({ method: 'get', url: `/login/${username}/${password}` })
            .then((res) => { props.renderClick(res.data, username, 'admin') })
        } else {

            alert('Please enter username and password')
        }
    }

    let returnRender = readyToRender ? (

        <div>
            <h3 className='test'>{`Welcome to AmazingDeals!`}</h3>
            <form>
                <br></br>

                <p>Email:</p>
                <input type='text' value={username} onChange={changeUsername}></input>
                <p>Password:</p>
                <input type='password' value={password} onChange={changePassword}></input>

                <br></br><br></br>
                <button onClick={ clickLogin }>Login</button>
                <button onClick={ () => props.renderSignUp() }>Sign Up</button>
                <br></br>
                <a href='#' onClick={ () => props.forgotPassword() }>Forgot password?</a>
            </form>
        </div>
    ) : (<div></div>);

    return returnRender
}

export default Login;

