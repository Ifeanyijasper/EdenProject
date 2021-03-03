import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Select from 'react-select';

import { Activity, Button, Input, Notify, SummitTech } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import styles from './AddClient.module.css';

const AddClient = (props) => {
    const {isOpen, setIsOpen, username, password} = props;
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
              if(res.length > 1) {
                let _res = res.filter((data) => data.is_client || data.is_superuser);
                if(_res.length > 0) {
                  _res.map((re, index) => (
                      _referals.push({value:re.id, label: re.username})
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

        if(name.length < 6) {
            setNameError(true);
            hasError = true;
        }

        if(userName.length < 6) {
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

        if(email.length < 8) {
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
          setIsOpen(false);
          setTel('');
          setName('');
          setRefer('');
          setEmail('');
        })
        .catch(err => {
          setIsLoading(false);
          setNotify(true);
        })
    }

    return (
        <Modal isOpen={isOpen} className={styles.modalContainer} overlayClassName={styles.overLay} closeTimeoutMS={400}>
            <SummitTech title="Add New Client" />
            <div className={styles.formContainer}>
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
                className={styles.selector} />
                <Input 
                placeholder="beautycomplex@gmail.com" 
                label="Email"
                secureText={false}
                type="email"
                value={email}
                setValue={(event) => setEmail(event.target.value)}
                error={emailError}
                setError={() => setEmailError} />

                <div className={styles.actionButtons}>
                  {isLoading ? (<Activity />) : (
                    <>
                      <Button title="Add" onClick={() => authenticate()} />
                      <Button title="Cancel" onClick={()=> setIsOpen(!isOpen)} />
                    </>  
                  )}
                </div>
            </div>
            <SummitTech title="Eden Beauty" />
            <Notify notify={notify} setNotify={setNotify} />
        </Modal>
    )
}

const mapStateToProps = ({auth}) => {
  return {
    endpoints: auth.endpoints,
    username: auth.username,
    password: auth.password,
  };
}

export default connect(mapStateToProps)(AddClient);

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
    borderBottom: '1.4px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#010f24',
    '&:hover': {
       border: isFocused ? 0 : 0,
       borderBottom: '1.4px',
       borderBottomStyle: 'solid',
       borderBottomColor: '#010f24',
    }
  })
};
