import React, {useEffect} from 'react'

const Notification = (props) => {
    const {notify, setNotify, msg} = props;
    useEffect(() => {
        setTimeout(() => {
            setNotify(false);
        }, 8000);        
    }, [notify]);
    
    return (
        <div onClick={()=> setNotify(false)} className={`fixed top-7 bg-white shadow-xl rounded z-50 p-3 px-4 text-center border-2 border-gray-800 transition-all duration-500 ease-in-out ${notify ? 'right-7' : '-right-96 md:-right-1/2'}`}>
            <h2 className={`text-base text-gray-700 font-semibold`}>{msg?.title}</h2>
            <h3 className={`text-sm text-gray-500`}>{msg?.message}</h3>
        </div>
    )
}

export default Notification;