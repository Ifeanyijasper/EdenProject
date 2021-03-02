import React from 'react';

import styles from './AdminCard.module.css';
import { MiniProgressBar } from '..';
import extractInitials from '../../utils/extractIni';

const AdminCard = (props) => {
    const {worker} = props;
    return (
        <div className={styles.adminCard}>
            <div className={styles.adminContainer}>
                {worker.img ? (
                     <img src={worker.img} alt="Admin Name" className={styles.adminImage} />
                ) : (
                    <h3 className={styles.workerIni}>{worker.fullname ? extractInitials(worker.fullname) : extractInitials(worker.username)}</h3>
                )}
               
            </div>
            <div className={styles.workerDetails}>
                <p className={styles.adminName}>{worker.fullname || worker.username}</p>
                <p className={styles.workerDetailsText}>Contact: {worker.phone}</p>
            </div>
           {/* <MiniProgressBar progress={worker.friend_name || 0 } /> */}
        </div>
    )
}

export default AdminCard;
