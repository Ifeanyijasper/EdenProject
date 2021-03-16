import React from 'react'
import extractInitials from '../../utils/extractIni';

import styles from './Testimonial.module.css';

const Testimonial = (props) => {
    const {testimonial} = props;
    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <h2 className={styles.userIni}>{extractInitials(testimonial.client_name)}</h2>
                <p className={styles.userName}>{testimonial.client_name}</p>
            </div>
            <div className={styles.testimonyContainer}>
                <p className={styles.testimony}>
                    {testimonial.testimonial.substr(0, 250)}
                </p>
                <p className={styles.testimonyDate}>{new Date(testimonial.date).toLocaleDateString()} at {new Date(testimonial.date).toLocaleTimeString('en-US')}</p>
            </div>
        </div>
    )
}

export default Testimonial;
