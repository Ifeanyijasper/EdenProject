import React, { useState } from 'react';
import { Button, Input, SummitTech } from '../../components';

import styles from './Login.module.css';

const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const authenticate = () => {
        let hasError = false;

        if(userName.length < 6) {
            setUserNameError(true);
            hasError = true;
        }
        if (password.length < 6) {
            setPasswordError(true);
            hasError = true;
        }
        if (!hasError) {
            if (userName === 'Jon Doe' && password === 'pas$word') {
                props.history.push({pathname: '/dashboard'});
            }
            if (userName === 'Jane Price' && password === 'pas$word') {
                props.history.push({pathname: '/client'});
            }
        }
    }

    return (
        <div className={styles.loginContainer}>
            <SummitTech title="Welcome to ServeUs" />
            <div className={styles.loginForm}>
                <h2 className={styles.formName}>Clientale</h2>
                <Input 
                label="Name" 
                placeholder="Jume Brice" 
                secureText={false}
                type="text"
                value={userName}
                setValue={(event) => setUserName(event.target.value)}
                error={userNameError}
                serError={() => setUserNameError()} />
                <Input 
                label="Password" 
                placeholder="******" 
                secureText={true}
                type="text"
                value={password}
                setValue={(event) => setPassword(event.target.value)}
                error={passwordError}
                serError={() => setPasswordError()} />
                <Button title="Login" onClick={() => authenticate()} />
            </div>
            <SummitTech title="Summit Tech" />
        </div>
    )
}

export default Login;

