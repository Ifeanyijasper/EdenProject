import React, { useState } from 'react';
import { IoCheckmarkOutline, IoCloseOutline, IoEye, IoEyeOff } from 'react-icons/io5';

import styles from './Input.module.css';

const Input = (props) => {
    const {
        placeholder, 
        type, 
        label, 
        secureText, 
        value, 
        setValue, 
        error, 
        setError,
        name,
    } = props;
    const [_secureText, setSecureText] = useState(secureText);

    return (
        <div className={`flex flex-col mb-4`}>
            <label for="name" className={`text-base font-semibold text-gray-800`}>{label}</label>
            <div className={`flex items-center justify-between border-b-2 ${error ? 'border-red-600' : 'border-gray-800'}`}>
                <input 
                    type={_secureText ? 'password' : type} 
                    placeholder={secureText ? (_secureText ? placeholder : 'dix134$5ive') : placeholder} 
                    className={`outline-none py-2 bg-transparent text-base text-gray-700 w-full`}
                    name={name}
                    onFocus={setError}
                    onChange={setValue}
                    value={value} 
                />
                {(type === 'text' || type === 'email' || type === 'number') && value?.length >= 6 && <IoCheckmarkOutline className="ml-auto text-lg font-bold text-green-500 cursor-pointer mr-2" />}
                    {(type === 'text' || type === 'email' || type === 'number') && value?.length >= 1 && value?.length < 6 && <IoCloseOutline className="ml-auto text-lg font-bold text-red-500 cursor-pointer mr-2" />}
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

export default Input;
