import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { Activity, Button, Notification, SummitTech, TextArea } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import styles from './AddTestimonial.module.css';

const AddTestimonial = (props) => {
    const {isOpen, setIsOpen, user, password} = props;
    const [about, setAbout] = useState('');
    const [aboutError, setAboutError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});


    const authenticate = () => {
      let hasError;
        setIsLoading(true);

        if(about.length < 8) {
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
          setMsg({
            title: 'Thanks for the Review',
            message: 'We will ensure to get better for you loyalty.'
          })
        })
        .then(res => {
          setTimeout(() => {
            setIsOpen(false); 
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
        <Modal isOpen={isOpen} className={styles.modalContainer} overlayClassName={styles.overLay} closeTimeoutMS={400}>
            <SummitTech title="Please give a great review" />
            <div className={styles.formContainer}>
            <TextArea
                placeholder="What should we improve on??" 
                label="Testimonial"
                value={about}
                setValue={(event) => setAbout(event.target.value)}
                error={aboutError}
                setError={() => setAboutError} />
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
            <Notification notify={notify} setNotify={setNotify} msg={msg} />
        </Modal>
    )
}

const mapStateToProps = ({auth}) => {
  return {
    user: auth.user,
    password: auth.password,
  };
}

export default connect(mapStateToProps)(AddTestimonial);
