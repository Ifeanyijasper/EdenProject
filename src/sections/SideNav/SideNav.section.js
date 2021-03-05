import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
    IoGrid, 
    IoPeople, 
    IoWallet, 
    IoLogOut, 
    IoWalk, 
    IoBody, 
    IoBriefcase, 
    IoPower,
    IoEllipsisHorizontal,
    IoCreate
} from "react-icons/io5";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './SideNav.module.css';
import { logo } from '../../res/images';
import {resetUser} from '../../redux/Actions/Auth.actions';

const SideNav = (props) => {
    const {user} = props;

    const [showLinks, setShowLinks] = useState(false);

    return (
        <div className={styles.sideNav}>
            <img src={logo} className={styles.logo} alt="Logo"/>
            <ul className={styles.linksNavSide}>
            <p className={styles.linksTitle}>Tools</p>
                {user.is_superuser && (
                    <>
                        <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink to="/dashboard" exact className={styles.linksLink} activeClassName={styles.linksActive}><IoGrid className={styles.icons} />Dashboard</NavLink></li>
                        <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/dashboard/clients'><IoPeople className={styles.icons} />Clients</NavLink></li>
                        <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/dashboard/workers'><IoWalk className={styles.icons} />Workers</NavLink></li>
                        <button className={styles.showButton} onClick={() => setShowLinks(!showLinks)}><IoEllipsisHorizontal /></button>
                        <div className={[styles.showList, showLinks ? styles.showOverflow : styles.hideOverflow].join(' ')}>
                            <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/dashboard/finances'><IoWallet className={styles.icons} />Finances</NavLink></li>
                            <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/dashboard/services'><IoBody className={styles.icons} />Services</NavLink></li>
                            <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/dashboard/products'><IoBriefcase className={styles.icons} />Products</NavLink></li>    
                            <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/dashboard/profile'><IoCreate className={styles.icons} />Profile</NavLink></li>    
                        </div>
                        
                    </>
                )}
                {user.is_worker && (
                    <>
                        <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink to="/dashboard" exact className={styles.linksLink} activeClassName={styles.linksActive}><IoGrid className={styles.icons} />Dashboard</NavLink></li>
                        <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/dashboard/clients'><IoPeople className={styles.icons} />Clients</NavLink></li>
                        <button className={styles.showButton} onClick={() => setShowLinks(!showLinks)}><IoEllipsisHorizontal /></button>
                        <div className={[styles.showList, showLinks ? styles.showOverflow : styles.hideOverflow].join(' ')}>
                            <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/dashboard/finances'><IoWallet className={styles.icons} />Finances</NavLink></li>
                            <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/dashboard/services'><IoBody className={styles.icons} />Services</NavLink></li>
                            <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/dashboard/products'><IoBriefcase className={styles.icons} />Products</NavLink></li>    
                            <li className={styles.linksItem} onClick={() => setShowLinks(false)}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/dashboard/profile'><IoCreate className={styles.icons} />Profile</NavLink></li>    
                        </div>
                    </>
                )}
                <p className={styles.linksTitle}>Other</p>
                {/* <li className={styles.linksItem}><NavLink className={styles.linksLink} activeClassName={styles.linksActive} to='/language'><IoLanguage className={styles.icons} />Language</NavLink></li> */}
                {/* <li className={styles.linksItem}><NavLink to='/support' className={styles.linksLink} activeClassName={styles.linksActive}><IoHelp className={styles.icons} />Support</NavLink></li> */}
                <li className={[styles.linksItem, styles.logOut].join(' ')} onClick={() => props.resetUser()}><NavLink to='/' exact className={styles.linksLink} activeClassName={styles.linksActive}><IoLogOut className={styles.icons} />Logout</NavLink></li>
                <li className={styles.linkLogout} onClick={() => props.resetUser()}><NavLink to="/" exact className={styles.linksLogout}><IoPower className={styles.linksIcons}/></NavLink></li>
            </ul>
            <div className={styles.footerContainer}>
                <p className={styles.footerContainerText}>Copyright @ <NavLink to='/summit-tech' className={styles.footerLink}>Summit Tech</NavLink></p>
            </div>
        </div>
    )
}

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
