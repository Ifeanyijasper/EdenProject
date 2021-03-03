import React, {useEffect} from 'react'

import styles from './Notification.module.css';

const Notification = (props) => {
    const {notify, setNotify, msg} = props;
    useEffect(() => {
        setTimeout(() => {
            setNotify(false);
        }, 3000);
        
    })
    return (
        <div className={notify ? styles.showNotification : styles.hideNotification}>
            <h2 className={styles.errorTitle}>{msg.type}</h2>
            <h3 className={styles.errorMsg}>{msg.message}</h3>
        </div>
    )
}

export default Notification;