import React from 'react';

import styles from './RankRate.module.css';

const RankRate = (props) => {
    const {rank, rate} = props;
    return (
        <div className={styles.rankRate}>
            {/* <h2 className={styles.rank}>{rank}<sup>rd</sup></h2> */}
            <h2 className={styles.rank}>{rate}%</h2>
            <div className={styles.rateContainer} style={{width: 250}}><div className={styles.rateBar} style={{width: rate * 2.5 }} /></div>
        </div>
    )
}

export default RankRate;

