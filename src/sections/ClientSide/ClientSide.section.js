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
        <div className={styles.clientSide}>
            <div className={styles.imageContainer}>
                {user.img ? 
                    <img src={img_4} alt="Client Name" className={styles.userImage} />: 
                    <h2 className={styles.userIni}>{extractInitials(user.fullname || user.username || 'Eden Beauty')}</h2>
                }
            </div>
            <div className={styles.clientInfoContainer}>
                <p className={styles.clientInfoTitle}>Contact</p>
                <h2 className={styles.clientInfoDetails}><IoCard className={styles.clientIcon} />{user.username}</h2>
                <h2 className={styles.clientInfoDetails}><IoMail className={styles.clientIcon} />{user.email}</h2>
                <h2 className={styles.clientInfoDetails}><IoLocation className={styles.clientIcon} />{user.location} </h2>
                <h2 className={styles.clientInfoDetails}><IoPhonePortrait className={styles.clientIcon} />{user.phone} </h2>
            </div>
            <ul className={styles.linksNavSide}>
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
        password: auth.password,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({resetUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientSide);
