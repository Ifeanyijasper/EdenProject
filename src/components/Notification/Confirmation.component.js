import React, { useEffect } from 'react'
import { Thousand } from '../../utils/number';

const Confirmation = (props) => {
    const { confirm, setConfirm, data, onClick, loading } = props;

    useEffect(() => {
        setTimeout(() => {
            setConfirm(false)
        }, 30000);
    }, []);

    const stop = (e) => {
        e.stopPropagation()
    }



    return (
        <>
            <div onClick={() => setConfirm(false)} className={`fixed z-50 w-full h-full bg-white bg-opacity-10 fixed z-20 backdrop-filter backdrop-blur-sm transition-all duration-500 ease-in-out ${confirm ? 'inset-0' : '-top-full left-0'}`}>
                <div
                    onClick={(e) => stop(e)}
                    className={`absolute capitalize shadow-xl py-4 px-2 md:p-4 w-72 md:w-96 text-wrap text-center font-semibold rounded-md bg-green-700 bg-opacity-90 left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white z-40 text-sm transition-all duration-500 ease-in-out`}
                >
                    <h2>{data?.msg} <br /> {data?.data?.fullname ? data?.data?.fullname : data?.data?.username}{data?.data?.name} {data?.data?.client && data?.data?.worker && `Purchase by ${data?.data?.client} served by ${data?.data?.worker}.`} <br /> {data?.data?.client && data?.data?.worker && `Total: ${Thousand(data?.data?.total)} XAF`}</h2>
                    <div className="flex items-center justify-end mt-3">
                        <button onClick={() => onClick(data?.data?.id)} className={`outline-none mx-2 px-2 py-1 rounded ${data?.suspend ? 'bg-yellow-400' : 'bg-red-500'}`}>{loading ? 'Deleting' : 'Confirm'}</button>
                        <button onClick={() => setConfirm(false)} className="outline-none mx-2 px-2 py-1 rounded bg-blue-400">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Confirmation;