import React from 'react';
const Login = (props) => {
    const loginMsg = props.loginMsg;
    return(
        <div className='login'>
            <button className={props.buttonStyle} id="login-button" onClick={props.handleLogin}>{loginMsg}</button>
        </div>
    )
}   

export default Login;