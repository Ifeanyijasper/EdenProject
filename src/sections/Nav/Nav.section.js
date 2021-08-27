import React, { useState } from 'react';
import { IoBody, IoBriefcase, IoChatbubbleEllipses, IoHome, IoImages, IoLogIn, IoMenu } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { logo } from '../../res/images';

import styles from './Nav.module.css';

const Nav = () => {
    const [profile, setProfile] = useState(false);


    return (
        <div className={`w-full md:w-17/100 flex md:flex-col justify-between items-center p-2 md:py-5 lg:px-3 bg-sec ${styles.nav}`}>
            <img src={logo} className={'w-10 h-10 md:w-20 md:h-20 bg-center bg-cover ml-2.5 md:mr-0'} alt="Logo" />
            <div className={`hidden md:flex flex-col mt-4 w-full`}>
                <NavLink to="/" exact className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoHome className="mr-2.5 font-semibold" /> Home</NavLink>
                <NavLink to='/services' exact className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoBody className="mr-2.5 font-semibold" /> Services</NavLink>
                <NavLink to='/products' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoBriefcase className="mr-2.5 font-semibold" /> Products</NavLink>
                <NavLink to='/gallery' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoImages className="mr-2.5 font-semibold" /> Gallery</NavLink>
                <NavLink to='/testimonials' className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoChatbubbleEllipses className="mr-2.5 font-semibold" /> Testimonials</NavLink>
                <NavLink to="/login" className={`flex items-center md:p-2 lg:p-2.5 rounded text-xs text-gray-500 font-semibold mb-1 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoLogIn className="mr-2.5 font-semibold" /> Login</NavLink>
            </div>
            <div onClick={() => setProfile(!profile)} className="relative flex md:hidden text-white">
                <IoMenu className="text-xl" />
                <div className={`absolute z-20 h-screen -top-4 bg-sec rounded py-1 shadow-lg transition-all duration-500 ease-in-out ${profile ? 'w-56 -right-3 opacity-100 visible' : 'w-10 opacity-0 -right-20 invisible'}`}>
                    <div onClick={() => setProfile(!profile)}  className="py-5 px-3">
                        <NavLink to="/" exact className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoHome className="mr-2.5 font-semibold" /> Home</NavLink>
                        <NavLink to='/services' exact className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoBody className="mr-2.5 font-semibold" /> Services</NavLink>
                        <NavLink to='/products' className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoBriefcase className="mr-2.5 font-semibold" /> Products</NavLink>
                        <NavLink to='/gallery' className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoImages className="mr-2.5 font-semibold" /> Gallery</NavLink>
                        <NavLink to='/testimonials' className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoChatbubbleEllipses className="mr-2.5 font-semibold" /> Testimonials</NavLink>
                        <NavLink to="/login" className={`flex items-center p-2 rounded text-sm text-gray-500 font-semibold my-1.5 transition-all duration-500 hover:bg-green-200 hover:bg-opacity-10 hover:text-gray-300`} activeClassName={`text-green-50 ${styles.sideNavActive}`}><IoLogIn className="mr-2.5 font-semibold" /> Login</NavLink>
                    </div>
                </div>
            </div>
            <div className={`mt-auto hidden md:block text-center text-white text-xs`}>
                <p>Copyright @ <NavLink to='/summit-tech' className={styles.footerLink}>Summit Tech</NavLink></p>
            </div>
        </div>
    )
};

export default Nav;
