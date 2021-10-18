import React, { useState } from 'react';

import ClientList from './ClientList/Client.list';

const ClientSection = () => {
    const [isDetail, setIsDetail] = useState(false);
    return (
        <section className={'flex'}>
            <ClientList isDetail={isDetail} setIsDetail={setIsDetail} />
        </section>
    )
}

export default ClientSection;
