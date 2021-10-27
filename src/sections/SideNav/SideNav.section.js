import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
    IoGrid, 
    IoPeople, 
    IoWallet, 
    IoLogOut, 
    IoWalk, 
    IoHandLeft,
    IoCreate,
    IoCash,
    IoMenu,
    IoLeaf,
    IoImages,
} from "react-icons/io5";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './SideNav.module.css';
import { logo } from '../../res/images';
import {resetUser} from '../../redux/Actions/Auth.actions';

const SideNav = (props) => {
    const { user } = props;

    const [profile, setProfile] = useState(false);

    return (
        <div className={`w-full md:w-17/100 flex md:flex-col justify-between items-center p-2 md:py-5 lg:px-3 bg-sec ${styles.nav}`}>
            <img src={logo} className={'w-10 h-10 md:w-20 md:h-20 bg-center bg-cover ml-2.5 md:mr-0'} alt="Logo" />
            {user.is_superuser && (
                <>
                    <div className={`hidden md:flex flex-col mt-4 w-full h-80 overflow-y-scroll overflowY`}>
                        <h4 className={'mt-4 mb-2 mx-1.5 text-sm font-semibold text-white'}>Tools</h4>
                        <NavLink to="/dashboard" exact className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoGrid className="mr-2.5 font-semibold" /> Dashboard</NavLink>
                        <NavLink to='/dashboard/clients' exact className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoPeople className="mr-2.5 font-semibold" /> Clients</NavLink>
                        <NavLink to='/dashboard/workers' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoWalk className="mr-2.5 font-semibold" /> Workers</NavLink>
                        <NavLink to='/dashboard/finances' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoWallet className="mr-2.5 font-semibold" /> Finances</NavLink>
                        <NavLink to='/dashboard/checkout' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoCash className="mr-2.5 font-semibold" /> Checkouts</NavLink>
                        <NavLink to='/dashboard/services' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoHandLeft className="mr-2.5 font-semibold" /> Services</NavLink>
                        <NavLink to='/dashboard/products' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoLeaf className="mr-2.5 font-semibold" /> Products</NavLink>
                        <NavLink to='/dashboard/gallery' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoImages className="mr-2.5 font-semibold" /> Gallery</NavLink>
                        <NavLink to='/dashboard/profile' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoCreate className="mr-2.5 font-semibold" /> Profile</NavLink>
                    </div>
                    <div onClick={() => setProfile(!profile)} className="relative flex md:hidden text-white">
                        <IoMenu className="text-xl" />
                        <div className={`absolute z-50 h-screen -top-4 bg-sec rounded py-1 shadow-lg transition-all duration-500 ease-in-out ${profile ? 'w-56 -right-3 opacity-100 visible' : 'w-10 opacity-0 -right-20 invisible'}`}>
                            <div onClick={() => setProfile(!profile)} className="py-5 px-3">
                                <h4 className={'mt-4 mb-2 mx-1.5 text-sm font-semibold text-white'}>Tools</h4>
                                <NavLink to="/dashboard" exact className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoGrid className="mr-2.5 font-semibold" /> Dashboard</NavLink>
                                <NavLink to='/dashboard/clients' exact className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoPeople className="mr-2.5 font-semibold" /> Clients</NavLink>
                                <NavLink to='/dashboard/workers' className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoWalk className="mr-2.5 font-semibold" /> Workers</NavLink>
                                <NavLink to='/dashboard/finances' className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoWallet className="mr-2.5 font-semibold" /> Finances</NavLink>
                                <NavLink to='/dashboard/checkout' className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoCash className="mr-2.5 font-semibold" /> Checkouts</NavLink>
                                <NavLink to="/dashboard/services" className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoHandLeft className="mr-2.5 font-semibold" /> Services</NavLink>
                                <NavLink to="/dashboard/products" className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoLeaf className="mr-2.5 font-semibold" /> Products</NavLink>
                                <NavLink to="/dashboard/gallery" className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoImages className="mr-2.5 font-semibold" /> Gallery</NavLink>
                                <NavLink to="/dashboard/profile" className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoCreate className="mr-2.5 font-semibold" /> Profile</NavLink>
                                <h4 className={'mt-5 mx-1.5 text-sm font-semibold text-white'}>Other</h4>
                                <NavLink to="/" exact onClick={() => props.resetUser()} className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoLogOut className="mr-2.5 font-semibold" /> Logout</NavLink>
                            </div>
                            <div className={`text-center text-white text-xs mt-36`}>
                                <p>Copyright @ <a href='https://summittech-eng.org/' target="_blank" rel="noreferrer"  className={styles.footerLink}>Summit Tech</a></p>
                            </div>
                        </div>
                    </div>
                    <div className={`hidden md:flex flex-col mt-4 w-full`}>
                        <h4 className={'mt-5 mx-1.5 text-sm font-semibold text-white'}>Other</h4>
                        <NavLink to="/" exact onClick={() => props.resetUser()} className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoLogOut className="mr-2.5 font-semibold" /> Logout</NavLink>
                    </div>
                </>
            )}
            {user.is_worker && (
                <>
                    <div className={`hidden md:flex flex-col mt-4 w-full h-80 overflow-y-scroll overflowY`}>
                        <h4 className={'mt-4 mb-2 mx-1.5 text-sm font-semibold text-white'}>Tools</h4>
                        <NavLink to="/dashboard" exact className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoGrid className="mr-2.5 font-semibold" /> Dashboard</NavLink>
                        <NavLink to='/dashboard/clients' exact className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoPeople className="mr-2.5 font-semibold" /> Clients</NavLink>
                        <NavLink to='/dashboard/workers' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoWalk className="mr-2.5 font-semibold" /> Workers</NavLink>
                        <NavLink to='/dashboard/finances' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoWallet className="mr-2.5 font-semibold" /> Finances</NavLink>
                        <NavLink to='/dashboard/checkout' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoCash className="mr-2.5 font-semibold" /> Checkouts</NavLink>
                        <NavLink to='/dashboard/services' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoHandLeft className="mr-2.5 font-semibold" /> Services</NavLink>
                        <NavLink to='/dashboard/products' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoLeaf className="mr-2.5 font-semibold" /> Products</NavLink>
                        <NavLink to='/dashboard/gallery' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoImages className="mr-2.5 font-semibold" /> Gallery</NavLink>
                        <NavLink to='/dashboard/profile' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoCreate className="mr-2.5 font-semibold" /> Profile</NavLink>
                    </div>
                    <div onClick={() => setProfile(!profile)} className="relative flex md:hidden text-white">
                        <IoMenu className="text-xl" />
                        <div className={`absolute z-50 h-screen -top-4 bg-sec rounded py-1 shadow-lg transition-all duration-500 ease-in-out ${profile ? 'w-56 -right-3 opacity-100 visible' : 'w-10 opacity-0 -right-20 invisible'}`}>
                            <div onClick={() => setProfile(!profile)} className="py-5 px-3">
                                <h4 className={'mt-4 mb-2 mx-1.5 text-sm font-semibold text-white'}>Tools</h4>
                                <NavLink to="/dashboard" exact className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoGrid className="mr-2.5 font-semibold" /> Dashboard</NavLink>
                                <NavLink to='/dashboard/clients' exact className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoPeople className="mr-2.5 font-semibold" /> Clients</NavLink>
                                <NavLink to='/dashboard/workers' className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoWalk className="mr-2.5 font-semibold" /> Workers</NavLink>
                                <NavLink to='/dashboard/finances' className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoWallet className="mr-2.5 font-semibold" /> Finances</NavLink>
                                <NavLink to='/dashboard/checkout' className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoCash className="mr-2.5 font-semibold" /> Checkouts</NavLink>
                                <NavLink to="/dashboard/services" className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoHandLeft className="mr-2.5 font-semibold" /> Services</NavLink>
                                <NavLink to="/dashboard/products" className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoLeaf className="mr-2.5 font-semibold" /> Products</NavLink>
                                <NavLink to="/dashboard/gallery" className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoImages className="mr-2.5 font-semibold" /> Gallery</NavLink>
                                <NavLink to="/dashboard/profile" className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoCreate className="mr-2.5 font-semibold" /> Profile</NavLink>
                            </div>
                            <div className={`text-center text-white text-xs mt-auto`}>
                                <p>Copyright @ <a href='https://summittech-eng.org/' target="_blank" rel="noreferrer"  className={styles.footerLink}>Summit Tech</a></p>
                            </div>
                        </div>
                    </div>
                    <div className={`hidden md:flex flex-col mt-4 w-full mt-36`}>
                        <h4 className={'mt-5 mx-1.5 text-sm font-semibold text-white'}>Other</h4>
                        <NavLink to="/" exact onClick={() => props.resetUser()} className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoLogOut className="mr-2.5 font-semibold" /> Logout</NavLink>
                    </div>
                </>
            )}
            {/* <li className={styles.linksItem}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/language'><IoLanguage className={styles.icons} />Language</NavLink></li> */}
            {/* <li className={styles.linksItem}><NavLink to='/support' className={styles.linksLink} activeClassName={styles.linksActive}><IoHelp className={styles.icons} />Support</NavLink></li> */}
            <div className={`mt-auto hidden md:block text-center text-white text-xs`}>
                <p>Copyright @ <a href='https://summittech-eng.org/' target="_blank" className={styles.footerLink}>Summit Tech</a></p>
            </div>
        </div>
    )
};

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({resetUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);

const customStyles = {
    // borderWidth: '1px', 
    // borderColor: 'red', 
    // borderStyle: 'solid',
    // height: '200px',
    // display: 'flex',
    // flexDirection: 'column',
    // marginBottom: '9px',
}
