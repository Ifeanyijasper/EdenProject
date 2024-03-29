import React from 'react'
import { logo } from '../../res/images';

import styles from './card.module.css';

const Card = (props) => {
    const { gallery, grid, onClick } = props;

    return (
        <>
            <div
                onClick={() => onClick()}
                // style={{ backgroundImage: `url(${gallery.img})` }}
                className={`
                    transition-all duration-100 ease-in-out 
                    shadow-lg overflow-hidden relative bg-center bg-cover
                    w-72 h-72  rounded-md
                    ${grid === 2 && 'md:w-64 md:h-64 lg:w-64 lg:h-64'}
                    ${grid === 1 && 'md:w-64 md:h-64 lg:w-72 lg:h-72'}
                    ${grid === 0 && 'md:w-64 md:h-64'}
                    ${styles.imageContainer}
                `}>
                <img src={gallery && gallery?.img ? gallery?.img : logo} alt={gallery?.event}
                    className={`bg-cover bg-center
                        w-72 h-72  rounded-md
                        ${grid === 2 && 'md:w-64 md:h-64 lg:w-64 lg:h-64'}
                        ${grid === 1 && 'md:w-64 md:h-64 lg:w-72 lg:h-72'}
                        ${grid === 0 && 'md:w-64 md:h-64'}
                    `}
                />
                <div className={`p-4 absolute text-gray-50 inset-0 bg-gray-800 bg-opacity-60 lg:bg-opacity-20 transition duration-500 ease-in-out hover:bg-opacity-60 flex flex-col justify-between items-start ${styles.imageOverlay}`}>
                    <div className={`${styles.marketName} text-gray-100 text-left`}>
                        <h4 className="text-xs">{gallery.event}</h4>
                        <h2 className="text-sm">{gallery.name}</h2>
                    </div>
                    <div className={`${styles.marketButton}`}>
                        <h2 className="text-sm p-1 bg-green-500 rounded">Eden Beauty</h2>
                        {/* <SqrButton title={`Book`} onClick={() => setRedirect(true)} /> */}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Card;