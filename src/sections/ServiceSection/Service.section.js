import React, { useState } from 'react';

import styles from './Service.module.css';
import ServiceDetail from './ServiceDetail/ServiceDetail';
import ServiceList from './ServiceList/ServiceList';

const Service = () => {
    const [isDetail, setIsDetail] = useState(false);
    const [detail, setDetail] = useState({});

    return (
        <section className={styles.serviceSection}>
            <ServiceList isDetail={isDetail} setIsDetail={setIsDetail} setDetail={setDetail} />
            <ServiceDetail isDetail={isDetail} setIsDetail={setIsDetail} detail={detail} />
        </section>
    )
}

export default Service;
