import React from 'react';
import Activity from '../ActivityIndicator/ActivityIndicator.component';


const LoginButton = (props) => {
    const {title, onClick, type, loading} = props;
    return (
        <button className={`outline-none text-base mt-2 text-white ${loading ? 'p-0 border-gray-800': "p-2 border-tranparent"} cursor-pointer rounded border-2  font-semibold shadow-xl transtion-all duration-500 ease-in-out, ${type === 'danger' ? 'bg-red-500 hover:bg-green-50 hover:text-red-500 hover:border-red-500' :'bg-primary hover:bg-white hover:text-gray-800 hover:border-gray-800'}`} onClick={() => onClick()}>
            <p>{loading ? <div className="w-full h-full bg-white self-center"><Activity size={0.5} /></div> : title}</p>
        </button>
    )
}

export default LoginButton;
