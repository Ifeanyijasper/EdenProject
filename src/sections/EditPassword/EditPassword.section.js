import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators } from 'redux';

import { Activity, Button, Input, Notification, Notify, SummitTech } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import styles from './EditPassword.module.css';
import {setPassword} from '../../redux/Actions/Auth.actions';

const EditPassword = (props) => {
    const {isOpen, setIsOpen, user, password} = props;
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

    const authenticate = () => {
      let hasError;
      setIsLoading(true);

        if(oldPw.length < 6) {
            setOldPwError(true);
            hasError = true;
        }

        if(newPw.length < 6 || conPw.length < 6 || conPw !== newPw) {
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
            'Authorization': 'Basic ' + Buffer.from(user.username + ':' + password).toString('base64'),
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
            setIsOpen(false);
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
    }

    return (
        <Modal isOpen={isOpen} className={styles.modalContainer} overlayClassName={styles.overLay} closeTimeoutMS={400}>
            <SummitTech title="Edit Password" />
            <div className={styles.formContainer}>
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
                  <div className={styles.actionButtons}>
                  {isLoading ? (<Activity />) : (
                    <>
                      <Button title="Edit" onClick={() => authenticate()} />
                      <Button title="Cancel" onClick={()=> setIsOpen(!isOpen)} />
                    </>  
                  )}
                </div>
            </div>
            <SummitTech title="Eden Beauty" />
            <Notification notify={notify} setNotify={setNotify} msg={msg} />
        </Modal>
    )
}

const mapStateToProps = ({auth}) => {
  return {
    endpoints: auth.endpoints,
    user: auth.user,
    password: auth.password,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setPassword}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);

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
