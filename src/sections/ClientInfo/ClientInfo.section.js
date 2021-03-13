import React,{useState} from 'react';
import { IoBody, IoBriefcase, IoPencil, IoPeople, IoStatsChart } from 'react-icons/io5';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

import { ClientFinance, Products, Referal, Services, TimeLine, Profile } from '..';
import { RankRate, Search } from '../../components';
import styles from './ClientInfo.module.css';

const ClientInfo = (props) => {
    const {user} = props;
    const [filter, setFilter] = useState('');
    const [filters] = useState([
        'Week',
        'Months',
        'Years',
        'Name',
        'Worker'
    ])
    const [showDets, setShowDets] = useState(true);

    return (
        <div className={styles.clientInfo}>
            <div className={styles.clientContainer}>
                <h1 className={styles.clientName}>{user.fullname || user.username}</h1>
                <button className={styles.clientButton} onClick={() => setShowDets(!showDets)}>{showDets ? 'Hide Bonuses' : 'Show Bonuses'}</button>
            </div>
            {/* <p className={styles.lastVisit}>Last Visit: Mon, 22<sup>nd</sup> Dec, 2020</p> */}
            {/* <p className={styles.lastVisit}>Last Visit: 22/12/2020</p> */}
            { showDets &&
                <>
                    <div className={styles.clientHeader}>
                        <h2 className={styles.clientRating}>My Bonuses</h2>
                        <RankRate user={user} bonus={'my_bonus'} rate={user.my_bonus || 0} />
                    </div>
                    <div className={styles.clientHeader}>
                        <h2 className={styles.clientRating}>Referer Bonuses</h2>
                        <RankRate user={user} bonus={'refer_bonus'} rate={user.refer_bonus || 0} />
                    </div>
                </>
            }
            <nav className={styles.navContainer}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><NavLink to="/client" exact className={styles.navLink} activeClassName={styles.navActive}><IoStatsChart /> TimeLine</NavLink></li>
                    <li className={styles.navItem}><NavLink to="/client/referrals" className={styles.navLink} activeClassName={styles.navActive}><IoPeople /> Referred</NavLink></li>
                    <li className={styles.navItem}><NavLink to="/client/profile" className={styles.navLink} activeClassName={styles.navActive}><IoPeople /> Profile</NavLink></li>
                </ul>
                <hr className={styles.navLine}/>
            </nav>
            <Route path="/client" exact component={ClientFinance} />
            <Route path="/client/referrals" component={Referal} />
            <Route path="/client/profile" component={Profile} />
            <Route path="/client/services" component={Services} />
            <Route path="/client/products" component={Products} />
        </div>
    )
}

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user,
    }
}

export default connect(mapStateToProps)(ClientInfo);