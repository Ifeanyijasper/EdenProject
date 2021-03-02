import React from 'react';

import styles from './ActivityIndicator.module.css'

const Activity = (props) => {
    const {size} = props;
    
    return <div className={styles.spinner} style={{transform: `scale(${size})`}}></div>
}

export default Activity;
