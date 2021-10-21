import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity, Button, Input,  Notification } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import { editWorker } from '../../redux/Actions/Data.actions';

const EditPassword = (props) => {
    const { edit, setEdit, username, password } = props;

    const [oldPw, setOldPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [conPw, setConPw] = useState('');
    const [oldPwError, setOldPwError] = useState(false);
    const [newPwError, setNewPwError] = useState(false);
    const [conPwError, setConPwError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState(false);
    const [options, setOptions] = useState([]);
    const [msg, setMsg] = useState({});

    const stop = (e) => {
        e.stopPropagation()
    }

    const authenticate = () => {
        let hasError;
        setIsLoading(true);

        if (oldPw.length < 6) {
            setOldPwError(true);
            hasError = true;
        }

        if (newPw.length < 6 || conPw.length < 6 || conPw !== newPw) {
            setNewPwError(true);
            setConPwError(true);
            hasError = true;
        }

        if (hasError) {
            setIsLoading(false);
            return false;
        }

        const body = {
            old_password: oldPw,
            new_password: newPw,
        };

        fetch(`${BASE_URL}/change-password/`, {
            method: 'PATCH',
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
                props.setPassword(newPw);
                setMsg({
                    title: 'Successful',
                    message: res.message
                })
            })
            .then(res => {
                setTimeout(() => {
                    setEdit(false);
                }, 3000);
            })
            .catch(err => {
                setIsLoading(false);
                setMsg({
                    title: 'Unexpected Error',
                    message: 'An error occured, check you internet connection'
                })
                setNotify(true);
            })
    };

    return (
        <>
            <div onClick={() => setEdit(false)} className={`h-full bg-gray-50 bg-opacity-10 fixed z-50 top-0 backdrop-filter backdrop-blur-sm transition-all duration-500 ease-in-out ${edit ? 'right-0 w-full opacity-100' : '-right-16 opacity-0 w-0'} `}>
                <div onClick={(e) => stop(e)} className={`fixed shadow-xl h-screen overflow-y-auto overflowY -top-0 z-30 bg-white text-gray-700 p-8 transition-all delay-100 ease-in-out ${edit ? 'right-0 w-full md:w-96 lg:w-120 opacity-100' : '-right-16 opacity-0 w-0'}`}>
                    <div className="flex justify-between items-end md:mt-8 text-xl font-semibold text-green-700">
                        <h2>Change Password</h2>
                        <button onClick={() => setEdit(!edit)} className="flex items-center rounded-full outline-none text-base py-1 px-2 text-gray-900 bg-white shadow-md mx-1.5 transition duration-500 ease-in-out hover:shadow-xl"><IoClose /></button>
                    </div>
                    <hr className="my-2 mb-12" />
                    <div className="flex py-2 flex-col md:flex-row">
                        <div className="w-full pr-2 lg:pr-6">
                            <Input
                                placeholder="*********"
                                label="Old Password"
                                secureText={true}
                                type="text"
                                value={oldPw}
                                setValue={(event) => setOldPw(event.target.value)}
                                error={oldPwError}
                                setError={() => setOldPwError} />
                            <Input
                                placeholder="*********"
                                label="New Password"
                                secureText={true}
                                type="text"
                                value={newPw}
                                setValue={(event) => setNewPw(event.target.value)}
                                error={newPwError}
                                setError={() => setNewPwError} />
                            <Input
                                placeholder="*********"
                                label="Confirm New Password"
                                secureText={true}
                                type="text"
                                value={conPw}
                                setValue={(event) => setConPw(event.target.value)}
                                error={conPwError}
                                setError={() => setConPwError} />
                            <div className="flex justify-center md:justify-end mt-14">
                                {isLoading ? <Activity /> : <Button title="Change Password" invert={false} onClick={() => authenticate()} />}
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

const mapStateToProps = ({ auth }) => {
    return {
        username: auth.username,
        password: auth.password,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editWorker }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);