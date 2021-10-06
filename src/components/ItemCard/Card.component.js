import React, { useState } from 'react'
import { SqrButton } from '..';

import { Thousand } from '../../utils/number';
import styles from './card.module.css';
import CardDetail from './CardDetail.component';

const Card = (props) => {
    const { provider, grid, setRedirect } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});

    const Open = (data) => {
        if (data.quantity > 1) {
            setIsOpen(true);
            setData(data);  
        }
    }

    return (
        <>
            <div
                style={{ backgroundImage: `url(${provider.image})` }}
                className={`
                    transition-all duration-100 ease-in-out 
                    shadow-lg overflow-hidden relative bg-center bg-cover
                    w-72 h-72
                    ${grid === 2 && 'md:w-64 md:h-64 lg:w-64 lg:h-64'}
                    ${grid === 1 && 'md:w-64 md:h-64 lg:w-72 lg:h-72'}
                    ${grid === 0 && 'md:w-64 md:h-64'}
                    ${styles.imageContainer}
                `}>
                <div className={`p-4 absolute text-gray-50 inset-0 bg-gray-800 bg-opacity-60 lg:bg-opacity-20 transition duration-500 ease-in-out hover:bg-opacity-60 flex flex-col justify-between items-start ${styles.imageOverlay}`}>
                    <div className={`${styles.marketName} text-gray-100 text-left`}>
                        <h4 className="text-xs">{provider.title}</h4>
                        <h2 className="text-sm">{provider.subtitle}</h2>
                    </div>
                    <div className={`${styles.marketButton}`}>
                        <SqrButton title={`Shop`} onClick={() => setRedirect(true)} />
                    </div>
                </div>
            </div>
            {/* <CardDetail isOpen={isOpen} setIsOpen={setIsOpen} data={data} /> */}
        </>
    )
};

export default Card;