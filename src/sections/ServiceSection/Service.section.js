import React, { useState } from 'react';

import ServiceDetail from './ServiceDetail/ServiceDetail';
import ServiceList from './ServiceList/ServiceList';

const Service = () => {
    const [isDetail, setIsDetail] = useState(false);
    const [detail, setDetail] = useState({});

    return (
        <section className={`w-full min-h-full bg-white p-4 lg:p-6`}>
            <ServiceList isDetail={isDetail} setIsDetail={setIsDetail} setDetail={setDetail} />
            <ServiceDetail isDetail={isDetail} setIsDetail={setIsDetail} detail={detail} />
        </section>
    )
}

export default Service;
