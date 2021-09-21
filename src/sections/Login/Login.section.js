import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
    Activity,  
    Input, 
    LoginButton, 
    Notification, 
    SummitTech 
} from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import {setUser} from '../../redux/Actions/Auth.actions';
import styles from './Login.module.css';

const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});
    const [users, setUsers] = useState([]);

    const authenticate = () => {
        let hasError;
        setIsLoading(true);

        if(userName.length < 3) {
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

        if(hasError) {
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
            catch(err) {
                console.log(err, 'Received error');
            }
            
        }

        fetch(url+'/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(userName + ':' + password).toString('base64'),
            },
        })
            .then(res => {
                console.log(res)
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
                        if(_list[0].is_client) {
                            props.history.push({pathname: '/client'});
                        } else {
                            props.history.push({pathname: '/dashboard'});
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
                setNotify(true);
                setMsg({
                    title: 'Unexpected Error',
                    message: 'Please check your network connection.'
                })
            })
    }

    return (
        <div className={`w-full flex flex-col items-center justify-center p-8 md:py-6 lg:p-8 h-screen md:min-h-full ${styles.loginContainer}`}>
            <SummitTech title="WELCOME" />
            <div className={`rounded-lg shadow-lg ${styles.border}`}>
                <div className={`w-80 md:w-140 lg:w-150 m-2 py-10 px-7 md:p-10 bg-white flex rounded-lg flex-col`}>
                    <h2 className={`text-center text-lg md:text-2xl text-gray-800 mb-8`}>Eden-Beauty Complex</h2>
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
                </div>
            </div>
            <SummitTech title="Eden Beauty" />
            <Notification notify={notify} setNotify={setNotify} msg={msg} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);

