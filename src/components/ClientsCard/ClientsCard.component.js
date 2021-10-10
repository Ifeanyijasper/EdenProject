import React from 'react';

import extractInitials from '../../utils/extractIni';
import { Hyphenated } from '../../utils/number';


const ClientsCard = (props) => {
    const {client, setDetail, setIsDetail} = props;
    const showDetails = () => {
        setDetail(client);
        setIsDetail(true);
    }

    return (
        <div className={'cursor-pointer h-auto w-48 lg:w-60 bg-primary rounded-md flex justify-between items-center py-3 px-2'} onClick={() => showDetails()}>
            <div className={'flex justify-center flex-col items-center'}>
                {client.img ? (
                    <img src={client.img} alt="Admin Name" className={'h-12 lg:h-16 w-12 lg:w-16 rounded-full bg-center bg-cover'} />
                ) : (
                    <h3 className={'h-12 lg:h-16 w-12 lg:w-16 rounded-full text-gray-50 text-lg lg:text-2xl tracking-widest border-2 border-gray-200 flex justify-center items-center'}>{client.fullname ? extractInitials(client.fullname) : extractInitials(client.username)}</h3>
                )}
                
            </div>
            <div className={'flex flex-col ml-2 lg:ml-3 mr-auto'}>
                <p className={'text-gray-100 text-sm lg:text-base font-semibold mb-1'}>{client.fullname.substr(0, 15) || client.username}</p>
                <p className={'text-xs text-gray-400'}>Contact: {Hyphenated(client.phone) || 0}</p>
            </div>
           {/* <MiniProgressBar progress={client.friend_name || 0} /> */}
        </div>
    )

}

export default ClientsCard;
