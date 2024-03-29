import React from 'react';
import {IoArrowForward} from 'react-icons/io5';

const RouteIndicator = (props) => {
    const {route, current} = props;
    return (
        <div className={'flex justify-start items-center text-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-md sticky -top-5 md:top-3 z-30 pl-2 w-full py-2 rounded'}>
            <h2 className={'text-gray-700 font-semibold mr-1.5 items-center hidden md:flex'}>{route}  {current.length >= 1 && <IoArrowForward className={'mr-1'} />}</h2>
            <h2 className={'text-gray-700 md:text-gray-600 text-lg md:text-base font-semibold'}>{current}</h2>
        </div>
    )
}

export default RouteIndicator;
