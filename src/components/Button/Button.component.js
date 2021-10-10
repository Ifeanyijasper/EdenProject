import React from 'react';


const Button = (props) => {
    const { title, onClick, type, invert } = props;
    return (
        <button className={`
        outline-none flex items-center
        rounded-md p-2 px-5 text-sm md:text-sm
        font-semibold transition duration-500 ease-in-out
        hover:shadow-xl ${type === 'danger' && 'transition duration-500 ease-in-out bg-red-500 hover:bg-green-50 hover:text-red-500 hover:border-red-500 hover:shadow-xl'}
        ${invert ? `text-primary bg-white` : `text-white bg-primary`}
        `} onClick={() => onClick()}>
            <p>{title}</p>
        </button>
    )
};

export default Button;
