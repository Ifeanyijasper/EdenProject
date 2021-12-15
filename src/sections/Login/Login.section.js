import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';

import {
    Input, 
    LoginButton, 
    Notification, 
    SummitTech 
} from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import {setUser} from '../../redux/Actions/Auth.actions';
import styles from './Login.module.css';
import validateEmail from '../../utils/email.auth';

const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [conPassword, setConPassword] = useState('')
    const [action, setAction] = useState('login');
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [tokenError, setTokenError] = useState(false);
    const [conPasswordError, setConPasswordError] = useState(false);
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});
    const [users, setUsers] = useState([]);
    const [redirect, setRedirect] = useState({
        path: "/",
        active: false,
    })

    const authenticate = () => {
        let hasError;
        setIsLoading(true);

        if (userName.length < 3) {
            setUserNameError(true);
            hasError = true;
            setIsLoading(false);
            setNotify(true);
        }
        if (password.length < 6) {
            setPasswordError(true);
            hasError = true;
            setIsLoading(false);
            setNotify(true);
        }

        if (hasError) {
            setIsLoading(false);
            setNotify(true);
            setMsg({
                title: 'Wrong Credentials',
                message: 'Please check your input fields.'
            });
            return false;
        }

        const body = {
            username: userName,
            password: password,
        };
        
        let url = `${BASE_URL}`;

        const fetchUsers = async () => {
            try {
                const response = await fetch(`${url}/register/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + Buffer.from(userName + ':' + password).toString('base64'),
                    },
                });
                const registered = await response.json();
                setUsers(registered);
                return registered;
            }
            catch (err) {
                console.log(err, 'Received error');
            }
            
        }

        fetch(url + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(userName + ':' + password).toString('base64'),
            },
        })
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                if (res.detail) {
                    setIsLoading(false);
                    setNotify(true);
                    setMsg({
                        title: 'Unexpected Error',
                        message: res.detail
                    });
                }

                if (res.register) {
                    const list = fetchUsers();
                    list
                        .then(users => {
                            return [res, users];
                        })
                        .then(res => {
                            let _list = res[1].filter(data => userName === data.username);
                            setIsLoading(false);
                            props.setUser(_list[0], userName, password);
                            if (_list[0].is_client) {
                                // props.history.push({ pathname: '/client' });
                                setRedirect({
                                    path: '/client',
                                    active: true,
                                })
                            } else {
                                // props.history.push({ pathname: '/dashboard', exact: true });
                                setRedirect({
                                    path: '/dashboard',
                                    active: true,
                                })
                            }
                        })
                }
            })
            .catch(err => {
                setIsLoading(false);
                setNotify(true);
                setMsg({
                    title: 'Unexpected Error',
                    message: 'Please check your network connection.'
                })
            })
    }

    const forgot = () => {
        let hasError;
        setIsLoading(true);

        if (!validateEmail(email)) {
            setEmailError(true);
            hasError = true;
            setIsLoading(false);
            setNotify(true);
        }

        if (hasError) {
            setIsLoading(false);
            setNotify(true);
            setMsg({
                title: 'Wrong Credentials',
                message: 'Please enter a valid email address.'
            });
            return false;
        }

        console.log(email)
        const body = {
            email
        };
        

        fetch(`${BASE_URL}/password_reset/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                setIsLoading(false)
                if (res.status !== 'OK') {
                    setNotify(true);
                    setMsg({
                        title: 'User does not exist',
                        message: res.email
                    })
                    return false;
                }

                setAction('reset');
            })
            .catch(err => {
                setIsLoading(false);
                setNotify(true);
                setMsg({
                    title: 'Unexpected Error',
                    message: 'Please check your network connection.'
                })
            })
    };

    const reset = () => {
        let hasError;
        setIsLoading(true);

        if (token.length < 10) {
            setTokenError(true);
            hasError = true;
            setIsLoading(false);
        }

        if (password.length < 6) {
            setPasswordError(true);
            hasError = true;
            setIsLoading(false);
        }

        if (conPassword.length < 6) {
            setConPasswordError(true);
            hasError = true;
            setIsLoading(false);
        }

        if (password !== conPassword) {
            setConPasswordError(true);
            setPasswordError(true);
            setIsLoading(false);
            setNotify(true);
            setMsg({
                title: 'Password Mismatch',
                message: 'Please check your passwords.'
            });
            return false;
        }

        if (hasError) {
            setIsLoading(false);
            setNotify(true);
            setMsg({
                title: 'Wrong Credentials',
                message: 'Please enter a valid email address.'
            });
            return false;
        }

        console.log(email)
        const body = {
            token,
            password,
        };
        

        fetch(`${BASE_URL}/password_reset/confirm/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                setIsLoading(false)
                if (res.status !== 'OK') {
                    setNotify(true);
                    setMsg({
                        title: 'Token expired',
                        message: res.email
                    })
                    return false;
                }

                setAction('login');
                setPassword('');
                setNotify(true);
                setMsg({
                    title: 'Success',
                    message: 'Enjoy the Eden Beauty service.'
                })
            })
            .catch(err => {
                setIsLoading(false);
                setNotify(true);
                setMsg({
                    title: 'Unexpected Error',
                    message: 'Please check your network connection.'
                })
            })
    }

    return (
        <>
            {redirect.active ? <Redirect to={redirect.path} exact /> :
                <div className={`w-full flex flex-col items-center justify-center p-8 md:py-6 lg:p-8 h-screen md:min-h-full ${styles.loginContainer}`}>
                    <SummitTech title="WELCOME" />
                    <div className={`rounded-lg shadow-lg ${styles.border}`}>
                        <div className={`w-72 md:w-120 lg:w-128 m-2 py-10 px-7 md:p-10 bg-white flex rounded-lg flex-col`}>
                            <h2 className={`text-center text-lg md:text-2xl text-gray-800 mb-8`}>Eden-Beauty Complex</h2>
                            {action === 'login' ? <>
                                <Input
                                    label="Username"
                                    placeholder="Eden-Beauty"
                                    secureText={false}
                                    type="text"
                                    value={userName}
                                    setValue={(event) => setUserName(event.target.value)}
                                    error={userNameError}
                                    setError={() => setUserNameError(false)} />
                                <Input
                                    label="Password"
                                    placeholder="******"
                                    secureText={true}
                                    type="text"
                                    value={password}
                                    setValue={(event) => setPassword(event.target.value)}
                                    error={passwordError}
                                    setError={() => setPasswordError(false)} />
                                <LoginButton title="Login" loading={isLoading} onClick={() => authenticate()} />
                                <div className={'text-center mt-5 w-40 cursor-pointer ml-auto'} onClick={() => setAction('forgot')}><p className={'text-sm'}>Forgot Password?</p></div>
                            </> : action === 'forgot' ?
                                <>
                                    <p className={'text-sm -mt-5 mb-4 text-center text-gray-600'}>Please enter your email and click next, you will receive a token which you will use in changing your password.</p>
                                    <Input
                                        label="Email"
                                        placeholder="beautycomplex@gmail.com"
                                        secureText={false}
                                        type="email"
                                        value={email}
                                        setValue={(event) => setEmail(event.target.value)}
                                        error={emailError}
                                        setError={() => setEmailError(false)} />
                                    <LoginButton title="Next" loading={isLoading} onClick={() => forgot()} />
                                    <div className={'text-center mt-5 w-40 cursor-pointer ml-auto'} onClick={() => setAction('login')}><p className={'text-sm'}>Login</p></div>
                                        
                                </> : <>
                                    <p className={'text-sm -mt-5 mb-4 text-center text-gray-600'}>Please copy the token we've sent to your email and fill below.</p>
                                    <Input
                                        label="Token"
                                        placeholder="3dc14sldlf00ff454s934mggl2ff0yt"
                                        secureText={false}
                                        type="text"
                                        value={token}
                                        setValue={(event) => setToken(event.target.value)}
                                        error={tokenError}
                                        setError={() => setTokenError(false)} />
                                    <Input
                                        label="New Password"
                                        placeholder="******"
                                        secureText={true}
                                        type="text"
                                        value={password}
                                        setValue={(event) => setPassword(event.target.value)}
                                        error={passwordError}
                                        setError={() => setPasswordError(false)} />
                                    <Input
                                        label="Confirm Password"
                                        placeholder="******"
                                        secureText={true}
                                        type="text"
                                        value={conPassword}
                                        setValue={(event) => setConPassword(event.target.value)}
                                        error={conPasswordError}
                                        setError={() => setConPasswordError(false)} />
                                    <LoginButton title="Reset" loading={isLoading} onClick={() => reset()} />
                                </>}
                        </div>
                    </div>
                    <SummitTech title="Eden Beauty" />
                    <Notification notify={notify} setNotify={setNotify} msg={msg} />
                </div>}
        </>
    )
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);

