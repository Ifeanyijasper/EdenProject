import React from 'react';
import { img_2 } from '../../res/images';

import styles from './TestimonialCard.module.css';

const TestimonialCard = (props) => {
    const {testimony} = props;
    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <img src={testimony.img} className={styles.imageContainer} alt="User image" />
                <p className={styles.userName}>{testimony.name.substr(0, 10)}</p>
            </div>
            <p className={styles.testimony}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut
            </p>
        </div>
    )
}

export default TestimonialCard;
