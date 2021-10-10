import React, { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

import styles from './TextArea.module.css';

const TextArea = (props) => {
    const {placeholder, type, label, secureText, value, setValue, error, setError} = props;
    const [_secureText, setSecureText] = useState(secureText);

    return (
        <div className={`flex flex-col mb-4`}>
            <label for="name" className={`text-base font-semibold text-gray-800`}>{label}</label>
            <div className={`flex items-center justify-between border-b-2 ${error ? 'border-red-600' : 'border-gray-800'}`}>
                <textarea 
                    placeholder={secureText ? (_secureText ? placeholder : 'dix134$5ive') : placeholder} 
                    className={`outline-none pt-1 pb-0.5 bg-transparent text-base text-gray-700 w-full`}
                    onFocus={() => setError(false)}
                    onChange={setValue}
                    value={value}
                    rows={4}
                />

                {secureText && (
                <div onClick={() => setSecureText(!_secureText)}>
                    {_secureText ? 
                    <IoEyeOff className={`text-lg mr-3`} /> 
                    : 
                    <IoEye className={`text-lg mr-3`} />}
                </div>
                )}
                
                
            </div>
        </div>
    )
}

export default TextArea;
