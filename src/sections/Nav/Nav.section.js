import React from 'react';
import { IoBody, IoBriefcase, IoHome, IoLogIn } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { logo } from '../../res/images';

import styles from './Nav.module.css';

const Nav = () => {
    return (
        <div className={styles.nav}>
            <img src={logo} className={styles.logo} alt="Logo"/>
            <ul className={styles.sideNav}>
                <li className={styles.sideNavItem}><NavLink to="/" exact className={styles.sideNavLink} activeClassName={styles.sideNavActive}><IoHome className={styles.icons} /> Home</NavLink></li>
                <li className={styles.sideNavItem}><NavLink to='/services' exact className={styles.sideNavLink} activeClassName={styles.sideNavActive}><IoBody className={styles.icons} /> Services</NavLink></li>
                <li className={styles.sideNavItem}><NavLink to='/products' className={styles.sideNavLink} activeClassName={styles.sideNavActive}><IoBriefcase className={styles.icons} /> Products</NavLink></li>
                <li className={styles.sideNavItem}><NavLink to='/testimonials' className={styles.sideNavLink} activeClassName={styles.sideNavActive}><IoBriefcase className={styles.icons} /> Testimonials</NavLink></li>
                <li className={styles.sideNavItem}><NavLink to="/login" className={styles.sideNavLink} activeClassName={styles.sideNavActive}><IoLogIn className={styles.icons} /> Login</NavLink></li>
            </ul>
            <ul className={styles.topNav}>
                <li className={styles.topNavItem}><NavLink to="/" exact className={styles.topNavLink} activeClassName={styles.topNavActive}><IoHome className={styles.icons} /> Home</NavLink></li>
                <li className={styles.topNavItem}><NavLink to='/services' exact className={styles.topNavLink} activeClassName={styles.topNavActive}><IoBody className={styles.icons} /> Services</NavLink></li>
                <li className={styles.topNavItem}><NavLink to='/products' className={styles.topNavLink} activeClassName={styles.topNavActive}><IoBriefcase className={styles.icons} /> Products</NavLink></li>
                <li className={styles.topNavItem}><NavLink to='/testimonials' className={styles.topNavLink} activeClassName={styles.topNavActive}><IoBriefcase className={styles.icons} /> Testimonials</NavLink></li>
                <li className={styles.topNavItem}><NavLink to="/login" className={styles.topNavLink} activeClassName={styles.topNavActive}><IoLogIn className={styles.icons} /> Login</NavLink></li>
            </ul>
            <div className={styles.footerContainer}>
                <p className={styles.footerContainerText}>Copyright @ <NavLink to='/summit-tech' className={styles.footerLink}>Summit Tech</NavLink></p>
            </div>
        </div>
    )
}

export default Nav;
