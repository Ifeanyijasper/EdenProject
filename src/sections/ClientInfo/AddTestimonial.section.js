import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity, Button,  Notification, TextArea } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import { addClient } from '../../redux/Actions/Data.actions';

const AddClient = (props) => {
    const { add, setAdd, username, user, password } = props;

    const [about, setAbout] = useState('');
    const [aboutError, setAboutError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});

    const stop = (e) => {
        e.stopPropagation()
    }

    useEffect(() => {
        return () => {
            setAbout('');
            setAboutError(false);
            setIsLoading(false)
        }
    }, [])

    const authenticate = () => {
        let hasError;
        setIsLoading(true);

        if (about.length < 8) {
            hasError = true;
            setAboutError(true);
        }

        if (hasError) {
            setIsLoading(false);
            return false;
        }

        const body = {
            client_name: user.fullname || user.username,
            testimonial: about,
        };

        fetch(`${BASE_URL}/testimonial/`, {
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
                    title: 'Thanks for the Review',
                    message: 'We will ensure to get better for you loyalty.'
                })
            })
            .then(res => {
                setTimeout(() => {
                    setAdd(false);
                }, 3000);
                setAbout('');
            })
            .catch(err => {
                setIsLoading(false);
                setNotify(true);
                setMsg({
                    title: 'Unexpected Error',
                    message: 'An error occured, check you internet connection'
                })
            })
    }

    return (
        <>
            <div onClick={() => setAdd(false)} className={`h-full bg-gray-50 bg-opacity-10 fixed z-50 top-0 backdrop-filter backdrop-blur-sm transition-all duration-500 ease-in-out ${add ? 'right-0 w-full opacity-100' : '-right-16 opacity-0 w-0'} `}>
                <div className={`fixed shadow-xl h-screen overflow-y-auto overflowY -top-0 z-30 bg-white text-gray-700 p-8 transition-all delay-100 ease-in-out ${add ? 'right-0 w-full md:w-96 lg:w-120 opacity-100' : '-right-16 opacity-0 w-0'}`}>
                    <div onClick={(e) => stop(e)} className="-top-1/2 transform translate-y-1/2">
                        <div className="flex justify-between items-end text-xl font-semibold text-green-700">
                            <h2>Add Testimonial</h2>
                            <button onClick={() => setAdd(!add)} className="flex items-center rounded-full outline-none text-base py-1 px-2 text-gray-900 bg-white shadow-md mx-1.5 transition duration-500 ease-in-out hover:shadow-xl"><IoClose /></button>
                        </div>
                        <hr className="my-2 mb-12" />
                        <div className="flex py-2 flex-col md:flex-row">
                            <div className="w-full pr-2 lg:pr-6">
                                <TextArea
                                    placeholder="Why choose Eden Beauty?"
                                    label="Testimonial"
                                    value={about}
                                    setValue={(event) => setAbout(event.target.value)}
                                    error={aboutError}
                                    setError={() => setAboutError} />

                                <div className="flex justify-center md:justify-end mt-14">
                                    {isLoading ? <Activity /> : <Button title="Add Testimonial" invert={false} onClick={() => authenticate()} />}
                                    <div className="mx-2" />
                                    <Button title="Close" invert={true} onClick={() => setAdd(!add)} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Notification notify={notify} setNotify={setNotify} msg={msg} />
            </div>
        </>
    )
};

const mapStateToProps = ({ auth, data }) => {
    return {
        user: auth.user,
        username: auth.username,
        password: auth.password,
        _clients: data.clients,
        _workers: data.workers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addClient }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient);
