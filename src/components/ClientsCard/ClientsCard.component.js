import React, { useState } from 'react';
import { MiniProgressBar } from '..';
import extractInitials from '../../utils/extractIni';

import styles from './ClientsCard.module.css';

const ClientsCard = (props) => {
    const {client, setDetail, setIsDetail} = props;
    const showDetails = () => {
        setDetail(client);
        setIsDetail(true);
    }

    return (
        <div className={styles.clientCard} onClick={() => showDetails()}>
            <div className={styles.clientContainer}>
                {client.img ? (
                    <img src={client.img} alt="Admin Name" className={styles.clientImage} />
                ) : (
                    <h3 className={styles.clientIni}>{client.fullname ? extractInitials(client.fullname) : extractInitials(client.username)}</h3>
                )}
                
            </div>
            <div className={styles.workerDetails}>
                <p className={styles.clientName}>{client.fullname || client.username}</p>
                <p className={styles.workerDetailsText}>Contact: {client.phone || 0}</p>
            </div>
           {/* <MiniProgressBar progress={client.friend_name || 0} /> */}
        </div>
    )

}

export default ClientsCard;
