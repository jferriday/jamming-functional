import React from 'react';
const Login = (props) => {
    return(
        <div className='login'>
            <h2>Sign in with Spotify</h2>
            <button className="interface-button" id="login-button" onClick={props.handleLogin}>Login</button>
        </div>
    )
}   

export default Login;