import React from 'react';
import { ClientSide, ClientInfo } from '../../sections';

import styles from './Client.module.css';

const Client = () => {
    return (
        <div className={styles.clientPage}>
            <ClientSide />
            <ClientInfo />
        </div>
    )
}

export default Client;
