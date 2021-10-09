import React from 'react';

import styles from './WorkArea.module.css';

const WorkArea = (props) => {
    const {children} = props;
    return (
        <div className={`sm:h-full md:h-full w-full lg:rounded-r-xl overflow-x-hidden overflowY bg-white py-5 px-4`}>
            {children}
        </div>
    )
}

export default WorkArea;
