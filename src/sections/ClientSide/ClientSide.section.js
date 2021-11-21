import React from 'react';
import { IoBarChart, IoCard, IoLocation, IoLogOut, IoMail, IoPeople, IoPhonePortrait, IoPower, IoWallet } from 'react-icons/io5';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { img_4 } from '../../res/images';
import extractInitials from '../../utils/extractIni';
import styles from './ClientSide.module.css';
import {resetUser} from '../../redux/Actions/Auth.actions'

const ClientSide = (props) => {
    const {user} = props;
    return (
        <div className={`w-full md:w-17/100 flex md:flex-col justify-between items-center p-2 md:py-5 lg:px-3 bg-sec ${styles.clientSide}`}>
            <div className={'styles.imageContainer'}>
                {user.img ? 
                    <img src={img_4} alt="Client Name" className={"h-44 w-44 rounded-full bg-center bg-cover"} />: 
                    <h2 className={'h-8 w-8 md:h-20 lg:h-40 md:w-20 lg:w-40 bg-white flex items-center justify-center rounded-full md:text-2xl lg:text-5xl tracking-wider shadow-md'}>{extractInitials(user.fullname || user.username || 'Eden Beauty')}</h2>
                }
            </div>
            {/* <div className={"md:mt-1.5 text-base"}>
                <h2 className={"text-left font-semibold"}>Contact</h2>
                <h4 className={"flex items-center text-gray-600 text-sm mt-2"}><IoCard className="mr-3" />{user.username}</h4>
                <h4 className={"flex items-center text-gray-600 text-sm mt-2"}><IoMail className="mr-3" />{user.email}</h4>
                <h4 className={"flex items-center text-gray-600 text-sm mt-2"}><IoLocation className="mr-3" />{user.location} </h4>
                <h4 className={"flex items-center text-gray-600 text-sm mt-2"}><IoPhonePortrait className="mr-3" />{user.phone} </h4>
            </div> */}
            <div className="w-full">
                <div className={`hidden md:flex flex-col mt-4 w-full mt-36`}>
                    <NavLink to='/'  onClick={() => props.resetUser()} exact className={`flex items-center p-2 rounded text-xs md:text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`}><IoLogOut className={'mr-2'} />Logout</NavLink>
                </div>
                <div className={`mt-auto hidden md:block text-center text-white text-xs`}>
                    <p>Copyright @ <a href='https://summittech-eng.org/' target="_blank" rel="noreferrer"   className={styles.footerLink}>Summit Tech</a></p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user,
        password: auth.password,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({resetUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientSide);
