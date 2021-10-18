import React from 'react'
import { SqrButton } from '..';

import styles from './card.module.css';

const GalleryCard = (props) => {
    const { image, event, name, urlImage } = props;


    return (
        <>
            <div
                style={{ backgroundImage: `url(${(image && image.length >= 1) ? URL.createObjectURL(image[0]) : urlImage})` }}
                className={`
                    transition-all duration-100 ease-in-out 
                    shadow-lg overflow-hidden relative bg-center bg-cover
                    w-72 h-72  rounded-md
                    ${styles.imageContainer}
                `}>
                <div className={`p-4 absolute text-gray-50 inset-0 bg-gray-800 bg-opacity-60 lg:bg-opacity-20 transition duration-500 ease-in-out hover:bg-opacity-60 flex flex-col justify-between items-start ${styles.imageOverlay}`}>
                    <div className={`${styles.marketName} text-gray-100 text-left`}>
                        <h4 className="text-xs">{event}</h4>
                        <h2 className="text-sm">{name}</h2>
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

export default GalleryCard;

// ${grid === 2 && 'md:w-64 md:h-64 lg:w-64 lg:h-64'}
                    // ${grid === 1 && 'md:w-64 md:h-64 lg:w-72 lg:h-72'}
                    // ${grid === 0 && 'md:w-64 md:h-64'}