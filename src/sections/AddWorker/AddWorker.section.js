import React, { useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Select from 'react-select';

import { Activity, Button, Input, Notify, SummitTech } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import styles from './AddWorker.module.css';

const AddWorker = (props) => {
    const {isOpen, setIsOpen, username, password} = props;

    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});

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

        if(email.length < 8) {
          hasError = true;
          setEmailError(true);
        }

        if (hasError) {
            setIsLoading(false);
            console.log('Have error');
            return false;
        }

        const body = {
          fullname: name,
          username: userName,
          phone: tel,
          email: email,
          is_worker: true,
          password: 'Eden-Beauty'
        }

        console.log(body);

        fetch(`${BASE_URL}/register/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
          },
          body: JSON.stringify(body),
        })
        .then(res => {
          setNotify(true);
          setIsLoading(false);
          setMsg({
            type: 'Succesful',
            message: 'We have a new team mate'
          })
        })
        .then(res => {
          setTimeout(() => {
            setIsOpen(false);
          }, 3000);
          setTel('');
          setName('');
          setEmail('');
          setUserName('');
        })
        .catch(err => {
          setIsLoading(false);
          setNotify(true);
          setMsg({
            type: 'Unexpected',
            message: 'An error occured, check you internet connection'
          })
        })
    }
    return (
        <Modal isOpen={isOpen} className={styles.modalContainer} overlayClassName={styles.overLay} closeTimeoutMS={400}>
            <SummitTech title="Add New Worker" />
           <div className={styles.formContainer}>
                <Input 
                  placeholder="Shalot Price" 
                  label="Name"
                  secureText={false}
                  type="text"
                  value={name}
                  setValue={(event) => setName(event.target.value)}
                  error={nameError}
                  setError={() => setNameError} />
                <Input 
                  placeholder="shalot-price" 
                  label="Username"
                  secureText={false}
                  type="text"
                  value={userName}
                  setValue={(event) => setUserName(event.target.value)}
                  error={userNameError}
                  setError={() => setUserNameError} />
                <Input 
                placeholder="681726633" 
                label="Tel"
                secureText={false}
                type="number"
                value={tel}
                setValue={(event) => setTel(event.target.value)}
                error={telError}
                setError={() => setTelError} />
                <Input 
                placeholder="bricejume@gmail.com" 
                label="Email"
                secureText={false}
                type="email"
                value={email}
                setValue={(event) => setEmail(event.target.value)}
                error={emailError}
                setError={() => setEmailError} />

                <div className={styles.actionButtons}>
                  {isLoading ? (<Activity />) : (<>
                    <Button title="Add" onClick={() => authenticate()} />
                    <Button title="Cancel" onClick={()=> setIsOpen(!isOpen)} />
                  </>)}
                </div>
            </div>
            <SummitTech title="Eden Beauty" />
            <Notify notify={notify} setNotify={setNotify} msg={msg} />
        </Modal>
    )
}

const mapStateToProps = ({auth}) => {
  return {
    username: auth.username,
    password: auth.password,
  }
}

export default connect(mapStateToProps)(AddWorker);

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
