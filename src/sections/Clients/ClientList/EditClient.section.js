import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity, Button, Input,  Notification } from '../../../components';
import { BASE_URL } from '../../../utils/globalVariable';
import { editClient } from '../../../redux/Actions/Data.actions';

const EditClient = (props) => {
    const { edit, setEdit, username, password, detail } = props;

    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [tel, setTel] = useState('');
    const [refer, setRefer] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});

    const stop = (e) => {
        e.stopPropagation()
    }

    useEffect(() => {
        setName(detail.fullname);
        setEmail(detail.email);
        setTel(detail.phone);
        setUserName(detail.username)
        return () => {
            setTel('');
            setName('');
            setEmail('');
            setUserName('');
        }
    }, [detail]);

    const authenticate = () => {
        let hasError;
        setIsLoading(true);

        if (userName.length < 6) {
            setUserNameError(true);
            hasError = true;
        }

        if (tel.length < 9) {
            hasError = true;
            setTelError(true);
        }

        if (email.length < 8) {
            hasError = true;
            setEmailError(true);
        }

        if (hasError) {
            setIsLoading(false);
            return false;
        }

        const body = {
            fullname: name,
            username: userName,
            phone: tel,
            email,
        };

        fetch(`${BASE_URL}/register/${detail.id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            },
            body: JSON.stringify(body),
        })
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                setIsLoading(false);
                setNotify(true);
                setMsg({
                    title: 'Successful',
                    message: 'Client information updated.'
                });
                props.editClient(res);
            })
            .then(res => {
                setTimeout(() => {
                    setEdit(false);
                }, 3000);
                setTel('');
                setName('');
                setUserName('');
                setRefer('');
                setEmail('');
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err)
                setNotify(true);
                setMsg({
                    title: 'Unexpected Error',
                    message: 'An error occured, check you internet connection'
                })
            })
    }

    return (
        <>
            <div onClick={() => setEdit(false)} className={`h-full bg-gray-50 bg-opacity-10 fixed z-50 top-0 backdrop-filter backdrop-blur-sm transition-all duration-500 ease-in-out ${edit ? 'right-0 w-full opacity-100' : '-right-16 opacity-0 w-0'} `}>
                <div onClick={(e) => stop(e)} className={`fixed shadow-xl h-screen overflow-y-auto overflowY -top-0 z-30 bg-white text-gray-700 p-8 transition-all delay-100 ease-in-out ${edit ? 'right-0 w-full md:w-96 lg:w-120 opacity-100' : '-right-16 opacity-0 w-0'}`}>
                    <div className="flex justify-between items-end md:mt-8 text-xl font-semibold text-green-700">
                        <h2>Edit Client</h2>
                        <button onClick={() => setEdit(!edit)} className="flex items-center rounded-full outline-none text-base py-1 px-2 text-gray-900 bg-white shadow-md mx-1.5 transition duration-500 ease-in-out hover:shadow-xl"><IoClose /></button>
                    </div>
                    <hr className="my-2 mb-12" />
                    <div className="flex py-2 flex-col md:flex-row">
                        <div className="w-full pr-2 lg:pr-6">
                            <Input
                                placeholder={detail.fullname}
                                label="Name"
                                secureText={false}
                                type="text"
                                value={name}
                                setValue={(event) => setName(event.target.value)}
                                error={nameError}
                                setError={() => setNameError} />
                            <Input
                                placeholder={detail.username}
                                label="Username"
                                secureText={false}
                                type="text"
                                value={userName}
                                setValue={(event) => setUserName(event.target.value)}
                                error={userNameError}
                                setError={() => setUserNameError} />
                            <Input
                                placeholder={detail.phone}
                                label="Tel"
                                secureText={false}
                                type="number"
                                value={tel}
                                setValue={(event) => setTel(event.target.value)}
                                error={telError}
                                setError={() => setTelError} />
                            <Input
                                placeholder={detail.email}
                                label="Email"
                                secureText={false}
                                type="email"
                                value={email}
                                setValue={(event) => setEmail(event.target.value)}
                                error={emailError}
                                setError={() => setEmailError} />

                            <div className="flex justify-center md:justify-end mt-14">
                                {isLoading ? <Activity /> : <Button title="Edit Client" invert={false} onClick={() => authenticate()} />}
                                <div className="mx-2" />
                                <Button title="Close" invert={true} onClick={() => setEdit(!edit)} />
                            </div>
                        </div>
                    </div>
                </div>
                <Notification notify={notify} setNotify={setNotify} msg={msg} />
            </div>
        </>
    )
};

const mapStateToProps = ({auth}) => {
  return {
    username: auth.username,
    password: auth.password,
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editClient }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditClient);
