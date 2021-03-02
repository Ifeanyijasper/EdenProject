import React, { useState } from 'react';

import styles from './Client.module.css';
import ClientDetail from './ClientDetail/Client.detail';
import ClientList from './ClientList/Client.list';

const ClientSection = () => {
    const [isDetail, setIsDetail] = useState(false);
    const [detail, setDetail] = useState({});
    return (
        <section className={styles.clientSection}>
            <ClientList isDetail={isDetail} setIsDetail={setIsDetail} setDetail={setDetail} />
            <ClientDetail isDetail={isDetail} setIsDetail={setIsDetail} detail={detail} />
        </section>
    )
}

export default ClientSection;
