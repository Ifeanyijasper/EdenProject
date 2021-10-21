import React from 'react';


const Button = (props) => {
    const { title, onClick, type, invert } = props;
    return (
        <button className={`
        outline-none flex items-center
        rounded-md p-2 px-5 text-sm md:text-sm
        font-semibold transition duration-500 ease-in-out
        hover:shadow-xl
        ${invert ? `bg-white ${type === 'danger' ? 'text-red-500 bg-white' : 'text-primary'}` : `text-white bg-primary`}
        `} onClick={() => onClick()}>
            <p>{title}</p>
        </button>
    )
};

export default Button;
