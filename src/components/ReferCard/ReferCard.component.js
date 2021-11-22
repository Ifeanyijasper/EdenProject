import React from 'react';
import { IoBarChart } from 'react-icons/io5';
import { img_3 } from '../../res/images';
import extractInitials from '../../utils/extractIni';

const ReferCard = (props) => {
    const {refer} = props;
    return (
        <div className={`flex flex-col justify-center items-center w-32 my-4 mx-2 py-3 px-1.5 bg-white rounded shadow`}>
            <div className={`flex justify-center flex-col items-center`}>
                { refer.img ? 
                    <img src={img_3} alt="Refer name" className={`h-14 w-14 rounded-full mb-2 bg-white bg-center bg-cover`}/>
                    : 
                    <p className={`h-14 w-14 rounded-full mb-2 bg-white flex justify-center items-center text-xl font-semibold shadow-md`}>{refer.fullname ? extractInitials(refer.fullname) : extractInitials(refer.username)}</p>
                }
                <h2 className={`mb-2 text-sm text-primary text-center`}>{refer.fullname || refer.username}</h2>
            </div>
        </div>
    )
}

export default ReferCard;
