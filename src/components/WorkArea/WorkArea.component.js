import React from 'react';

const WorkArea = (props) => {
    const {children} = props;
    return (
        <div className={`h-screen md:h-auto w-full lg:rounded-r-xl overflow-x-hidden overflowY bg-white py-5 px-4`}>
            {children}
        </div>
    )
}

export default WorkArea;
