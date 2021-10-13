import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity, Button, Input,  Notification } from '../../../components';
import { BASE_URL } from '../../../utils/globalVariable';
import { addClient } from '../../../redux/Actions/Data.actions';

const AddClient = (props) => {
    const { add, setAdd, username, password } = props;

    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [tel, setTel] = useState('');
    const [refer, setRefer] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [referError, setReferError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState(false);
    const [options, setOptions] = useState([]);
    const [msg, setMsg] = useState({});

    const stop = (e) => {
        e.stopPropagation()
    }

    useEffect(() => {
        return () => {
            setTel('');
            setName('');
            setEmail('');
            setUserName('');
        }
    }, []);

    useEffect(() => {
        let _referals = [];
        fetch(`${BASE_URL}/register/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            },
        })
            .then(response => {
                const res = response.json();
                return res;
            })
            .then(res => {
                if (res.length >= 1) {
                    console.log(res);
                    let _res = res.filter((data) => data.is_client || data.is_superuser || data.is_worker );
                    if (_res.length > 0) {
                        _res.map((re, index) => (
                            _referals.push({ value: re.id, label: re.username })
                        ));
                    }
                    setOptions([..._referals]);
                }
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

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

        if (refer.length < 4) {
            hasError = true;
            setReferError(true);
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
            friend: refer.value,
            is_client: true,
            password: 'Eden-Beauty'
        };

        fetch(`${BASE_URL}/register/`, {
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
                    message: 'We have a new Client.'
                });
                props.addClient(res);
            })
            .then(res => {
                setTimeout(() => {
                    setAdd(false);
                }, 3000);
                setTel('');
                setName('');
                setUserName('');
                setRefer('');
                setEmail('');
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
                <div onClick={(e) => stop(e)} className={`fixed shadow-xl h-screen overflow-y-auto overflowY -top-0 z-30 bg-white text-gray-700 p-8 transition-all delay-100 ease-in-out ${add ? 'right-0 w-full md:w-96 lg:w-120 opacity-100' : '-right-16 opacity-0 w-0'}`}>
                    <div className="flex justify-between items-end md:mt-8 text-xl font-semibold text-green-700">
                        <h2>Add Client</h2>
                        <button onClick={() => setAdd(!add)} className="flex items-center rounded-full outline-none text-base py-1 px-2 text-gray-900 bg-white shadow-md mx-1.5 transition duration-500 ease-in-out hover:shadow-xl"><IoClose /></button>
                    </div>
                    <hr className="my-2 mb-12" />
                    <div className="flex py-2 flex-col md:flex-row">
                        <div className="w-full pr-2 lg:pr-6">
                            <Input
                                placeholder="Eden Beauty"
                                label="Fullname"
                                secureText={false}
                                type="text"
                                value={name}
                                setValue={(event) => setName(event.target.value)}
                                error={nameError}
                                setError={() => setNameError} />
                            <Input
                                placeholder="eden-beauty"
                                label="Username"
                                secureText={false}
                                type="text"
                                value={userName}
                                setValue={(event) => setUserName(event.target.value)}
                                error={userNameError}
                                setError={() => setUserNameError} />
                            <Input
                                placeholder="6X1234567"
                                label="Telephone Number"
                                secureText={false}
                                type="number"
                                value={tel}
                                setValue={(event) => setTel(event.target.value)}
                                error={telError}
                                setError={() => setTelError} />
                            <Select
                                options={options}
                                styles={customStyles}
                                onChange={(value) => setRefer(value)}
                                className={'text-base text-primary mb-5 bg-white bg-opacity-0'} />
                            <Input
                                placeholder="beautycomplex@gmail.com"
                                label="Email"
                                secureText={false}
                                type="email"
                                value={email}
                                setValue={(event) => setEmail(event.target.value)}
                                error={emailError}
                                setError={() => setEmailError} />

                            <div className="flex justify-center md:justify-end mt-14">
                                {isLoading ? <Activity /> : <Button title="Add Client" invert={false} onClick={() => authenticate()} />}
                                <div className="mx-2" />
                                <Button title="Close" invert={true} onClick={() => setAdd(!add)} />
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
    return bindActionCreators({ addClient }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient);


const customStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#010f24" : null,
      color: isFocused ? "white" : '#999',
    };
  },
  control: (base, {isFocused}) => ({
    ...base,
    backgroundColor: 'transparent',
    border: 'none',
    // This line disable the blue border
    boxShadow: 'none',
    borderRadius: 0,
    borderBottom: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#010f24',
    '&:hover': {
       border: isFocused ? 0 : 0,
       borderBottom: '2px',
       borderBottomStyle: 'solid',
       borderBottomColor: '#010f24',
    }
  })
};