import React from 'react';

import styles from './WorkArea.module.css';

const WorkArea = (props) => {
    const {children} = props;
    return (
        <div className={styles.workArea}>
            {children}
        </div>
    )
}

export default WorkArea;
