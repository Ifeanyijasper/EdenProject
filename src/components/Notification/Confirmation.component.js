import React, { useEffect } from 'react'

const Confirmation = (props) => {
    const { confirm, setConfirm, data, onClick, loading } = props;

    useEffect(() => {
        setTimeout(() => {
            setConfirm(false)
        }, 30000);
    }, []);


    return (
        <>
            <div className={`fixed z-50 w-full h-full bg-white bg-opacity-10 fixed z-20 backdrop-filter backdrop-blur-sm transition-all duration-500 ease-in-out  ${confirm ? 'inset-0' : '-top-full left-0'}`}>
                <div
                    className={`absolute capitalize shadow-xl p-4 w-54 text-wrap font-semibold rounded-md bg-yellow-700 bg-opacity-90 left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white z-40 text-sm transition-all duration-500 ease-in-out`}
                >
                    <h2>{data?.msg} {data?.data?.fullname ? data?.data?.fullname : data?.data?.username}{data?.data?.name}</h2>
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