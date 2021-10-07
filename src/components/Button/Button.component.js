import React from 'react';


const Button = (props) => {
    const {title, onClick, type} = props;
    return (
        <button className={`outline-none text-xs mt-2 text-white p-2 cursor-pointer rounded border-2 border-tranparent font-semibold shadow-xl transtion-all duration-500 ease-in-out, ${type === 'danger' ? 'bg-red-500 hover:bg-green-50 hover:text-red-500 hover:border-red-500' :'bg-primary hover:bg-white hover:text-gray-800 hover:border-gray-800'}`} onClick={() => onClick()}>
            <p>{title}</p>
        </button>
    )
}

export default Button;
