import React from 'react';

import styles from './Button.module.css';

const Button = (props) => {
    const {title, onClick, type} = props;
    return (
        <button className={[styles.buttonContainer, type === 'danger' ? styles.dangerColor : styles.generalColor].join(' ')} onClick={() => onClick()}>
            <p className={styles.buttonText}>{title}</p>
        </button>
    )
}

export default Button;
