import React from 'react'

const SqrButton = (props) => {
    const { title, invert, onClick } = props;
    return (
        <button onClick={() => onClick()} className={`outline-none px-4 mb-2 py-2 border-2  transition duration-500 ease-in-out ${invert ? 'text-green-700 border-green-700 hover:bg-green-700 hover:text-white': 'text-white border-white hover:bg-white hover:text-green-700 '}`}>
            {title}
        </button>
    )
}

export default SqrButton;