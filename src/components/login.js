import React from 'react';
const Login = (props) => {
    return(
        <div className='login'>
            <button className={props.buttonStyle} id="login-button" onClick={props.handleLogin}>Login</button>
        </div>
    )
}   

export default Login;