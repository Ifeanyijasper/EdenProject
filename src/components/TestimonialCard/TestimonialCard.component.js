import React from 'react';
import { img_2 } from '../../res/images';
import extractInitials from '../../utils/extractIni';

import styles from './TestimonialCard.module.css';

const TestimonialCard = (props) => {
    const {testimony} = props;
    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <h2 className={styles.userIni}>{extractInitials(testimony.client_name)}</h2>
                <p className={styles.userName}>{testimony.client_name.substr(0, 10)}</p>
            </div>
            <p className={styles.testimony}>
                {testimony.testimonial.substr(0, 130)}
            </p>
        </div>
    )
}

export default TestimonialCard;
