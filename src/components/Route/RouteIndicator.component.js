import React from 'react';
import {IoArrowForward} from 'react-icons/io5';

import styles from './RouteIndicator.module.css';

const RouteIndicator = (props) => {
    const {route, current} = props;
    return (
        <div className={styles.route}>
            <h2 className={styles.routePath}>{route}  <IoArrowForward className={styles.icon} /></h2>
            <h2 className={styles.routeName}>{current}</h2>
        </div>
    )
}

export default RouteIndicator;
