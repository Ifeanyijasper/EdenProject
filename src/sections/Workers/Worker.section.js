import React, { useState } from 'react';

import WorkerList from './WorkerList/Worker.list';

const WorkerSection = () => {
    const [isDetail, setIsDetail] = useState(false);
    return (
        <section className={'flex'}>
            <WorkerList isDetail={isDetail} setIsDetail={setIsDetail} />
        </section>
    )
}

export default WorkerSection;
