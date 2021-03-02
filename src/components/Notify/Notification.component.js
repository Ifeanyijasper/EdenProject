import React, {useEffect} from 'react'

import styles from './Notification.module.css';

const Notification = (props) => {
    const {notify, setNotify, error} = props;
    useEffect(() => {
        setTimeout(() => {
            setNotify(false);
        },3000);
        
    })
    return (
        <div className={notify ? styles.showNotification : styles.hideNotification}>
            <h2 className={styles.errorTitle}>An error occured</h2>
            <h3 className={styles.errorMsg}>Invalid username or password</h3>
        </div>
    )
}

export default Notification;