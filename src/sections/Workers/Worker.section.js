import React, { useState } from 'react';

import styles from './Worker.module.css';
import WorkerDetail from './WorkerDetail/Worker.detail';
import WorkerList from './WorkerList/Worker.list';

const WorkerSection = () => {
    const [isDetail, setIsDetail] = useState(false);
    const [detail, setDetail] = useState({});
    return (
        <section className={styles.clientSection}>
            <WorkerList isDetail={isDetail} setIsDetail={setIsDetail} detail={detail} setDetail={setDetail} />
            <WorkerDetail isDetail={isDetail} setIsDetail={setIsDetail} detail={detail} setDetail={setDetail} />
        </section>
    )
}

export default WorkerSection;
