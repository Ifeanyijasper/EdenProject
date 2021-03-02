import React from 'react';

import styles from './SummitTech.module.css';

const SummitTech = ({title}) => {
    return <h2 className={styles.company}>{title}</h2>
}

export default SummitTech;
