import React from 'react';

import styles from './AdminCard.module.css';
import { MiniProgressBar } from '..';
import extractInitials from '../../utils/extractIni';
import { Hyphenated } from '../../utils/number';

const AdminCard = (props) => {
    const {worker} = props;
    return (
        <div className={'cursor-pointer h-auto w-60 bg-primary rounded-md flex justify-between items-center py-3 px-2'}>
            <div className={'flex justify-center flex-col items-center'}>
                {worker.img ? (
                     <img src={worker.img} alt="Admin Name" className={'h-16 w-16 rounded-full bg-center bg-cover'} />
                ) : (
                    <h3 className={'h-16 w-16 rounded-full text-gray-50 text-2xl tracking-widest border-2 border-gray-200 flex justify-center items-center'}>{worker.fullname ? extractInitials(worker.fullname) : extractInitials(worker.username)}</h3>
                )}
               
            </div>
            <div className={'flex flex-col ml-3 mr-auto'}>
                <p className={'text-gray-100 font-semibold mb-1'}>{worker.fullname || worker.username}</p>
                <p className={'text-xs text-gray-400'}>Contact: {Hyphenated(worker.phone)}</p>
            </div>
           {/* <MiniProgressBar progress={worker.friend_name || 0 } /> */}
        </div>
    )
}

export default AdminCard;
