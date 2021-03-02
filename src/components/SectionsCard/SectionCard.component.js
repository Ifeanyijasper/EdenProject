import React from 'react';
import { IoPeople } from 'react-icons/io5';
import { MiniProgressBar } from '..';

import styles from './SectionsCard.module.css';

const SectionsCard = (props) => {
    const {stat} = props;
    return (
        <div className={styles.sectionCard}>
            <div className={styles.sectionInfo}>
                <IoPeople className={styles.icon} />
                <p className={styles.sectionText}>{stat.for}: {stat.current}</p>
            </div>
            <p>Goal: {stat.goal}</p>
            <MiniProgressBar progress={stat.current/stat.goal * 100} />
        </div>
    )
}

export default SectionsCard;
