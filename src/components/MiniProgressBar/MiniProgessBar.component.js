import React from 'react';
import { IoBarChart} from 'react-icons/io5';

import styles from './MiniProgressBar.module.css';

const MiniProgressBar = (props) => {
    const {progress} = props;
    return (
        <div className={styles.progress}>
                <IoBarChart />
                <div className={styles.progressContainer} style={{width: 100, overflow: 'hidden'}}><div className={styles.progressBar} style={{width: progress}}></div></div>
                <p className={styles.progressPercentage}>{progress.toFixed(2)}%</p>
            </div>
    )
}

export default MiniProgressBar;
