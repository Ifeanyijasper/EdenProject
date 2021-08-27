import React from 'react';

import styles from './SummitTech.module.css';

const SummitTech = ({title}) => {
    return <h2 className={`text-xl md:text-2xl text-transparent capitalize ${styles.company}`}>{title}</h2>
}

export default SummitTech;
