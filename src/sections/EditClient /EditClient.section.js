import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity, Button, Input, Notification, SummitTech } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import styles from './EditClient.module.css';
import {setRefresh} from '../../redux/Actions/Refresh.actions';

const EditClient = (props) => {
    const {
      isOpen, 
      setIsOpen, 
      detail, 
      username, 
      password,
      setIsDetail,
    } = props;

     useEffect(()=> {
      setName(detail.fullname);
      setEmail(detail.email);
      setTel(detail.phone);
      setUserName(detail.username)
    },[detail])

    useEffect(() => {
      props.setRefresh(false);
    }, [isOpen])

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
            return false;
        }

        const body = {
          fullname: name,
          username: userName,
          phone: tel,
          email: email,
        }

        fetch(`${BASE_URL}/register/${detail.id}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
          },
          body: JSON.stringify(body),
        })
        .then(res => {
          setIsLoading(false);
          props.setRefresh(true);
          setNotify(true);
          setMsg({
            title: 'Successful',
            message: 'Client information updated'
          })
        })
        .then(res => {
          setTimeout(() => {
            setIsDetail(false);
            setIsOpen(false);
          }, 3000);
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
        <Modal isOpen={isOpen} className={styles.modalContainer} overlayClassName={styles.overLay} closeTimeoutMS={400}>
            <SummitTech title="Edit Client" />
            <div className={styles.formContainer}>
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

                <div className={styles.actionButtons}>
                    {isLoading ? (<Activity />) :(
                    <>
                      <Button title="Edit" onClick={() => authenticate()} />
                      <Button title="Cancel" onClick={()=> setIsOpen(!isOpen)} />
                    </>)}
                </div>
            </div>
            <SummitTech title="Eden Beauty" />
            <Notification notify={notify} setNotify={setNotify} msg={msg} />
        </Modal>
    )
}

const mapStateToProps = ({auth}) => {
  return {
    username: auth.username,
    password: auth.password,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setRefresh}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditClient);

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
