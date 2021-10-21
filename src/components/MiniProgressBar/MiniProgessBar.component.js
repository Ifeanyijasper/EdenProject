import React from 'react';
import { IoBarChart} from 'react-icons/io5';


const MiniProgressBar = (props) => {
    const {progress} = props;
    return (
        <div className={'flex justify-center items-center text-gray-400 text-sm font-semibold'}>
                <IoBarChart />
                <div className={'h-1.5 rounded mx-2 overflow-hidden bg-green-400 bg-opacity-30'} style={{width: 100, overflow: 'hidden'}}><div className={'h-1.5 rounded bg-green-500'} style={{width: progress}}></div></div>
                <p className={''}>{progress.toFixed(0)}%</p>
            </div>
    )
}

export default MiniProgressBar;
