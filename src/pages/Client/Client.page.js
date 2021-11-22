import React from 'react';
import { ClientSide, ClientInfo } from '../../sections';

const Client = () => {
    return (
        <div className={'h-screen overflow-hidden md:p-0 lg:p-4 flex flex-col md:flex-row'}>
            <ClientSide />
            <ClientInfo />
        </div>
    )
}

export default Client;
