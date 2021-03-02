import React, { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

import styles from './TextArea.module.css';

const TextArea = (props) => {
    const {placeholder, type, label, secureText, value, setValue, error, setError} = props;
    const [_secureText, setSecureText] = useState(secureText);

    return (
        <div className={styles.inputContainer}>
            <label for="name" className={styles.inputLabel}>{label}</label>
            <div className={error ? styles.inputFieldError : styles.inputFieldContainer}>
                <textarea 
                    placeholder={secureText ? (_secureText ? placeholder : 'dix134$5ive') : placeholder} 
                    className={styles.inputField}
                    onFocus={() => setError(false)}
                    onChange={setValue}
                    value={value} 
                ></textarea>

                {secureText && (
                <div onClick={() => setSecureText(!_secureText)}>
                    {_secureText ? 
                    <IoEyeOff className={styles.inputFieldIcon} /> 
                    : 
                    <IoEye className={styles.inputFieldIcon} />}
                </div>
                )}
                
                
            </div>
        </div>
    )
}

export default TextArea;
