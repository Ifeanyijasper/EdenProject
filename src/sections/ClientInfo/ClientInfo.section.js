import React,{useState} from 'react';
import { IoBody, IoBriefcase, IoPencil, IoPeople, IoStatsChart } from 'react-icons/io5';
import { NavLink, Route } from 'react-router-dom';

import { ClientFinance, FinanceSection, Products, Referal, Services, TimeLine } from '..';
import { RankRate, Search } from '../../components';
import styles from './ClientInfo.module.css';

const ClientInfo = () => {
    const [filter, setFilter] = useState('');
    const [filters] = useState([
        'Week',
        'Months',
        'Years',
        'Name',
        'Worker'
    ])
    return (
        <div className={styles.clientInfo}>
            <div className={styles.clientContainer}>
                <h1 className={styles.clientName}>Jane Price</h1>
                <button className={styles.clientButton}>
                    <IoPencil /> Edit
                </button>
            </div>
            {/* <p className={styles.lastVisit}>Last Visit: Mon, 22<sup>nd</sup> Dec, 2020</p> */}
            <p className={styles.lastVisit}>Last Visit: 22/12/2020</p>
            <div className={styles.clientHeader}>
                <h2 className={styles.clientRating}>Ratings</h2>
                <RankRate rank={25} rate={45} />
            </div>
            <nav className={styles.navContainer}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><NavLink to="/client" exact className={styles.navLink} activeClassName={styles.navActive}><IoStatsChart /> TimeLine</NavLink></li>
                    <li className={styles.navItem}><NavLink to="/client/referrals" className={styles.navLink} activeClassName={styles.navActive}><IoPeople /> Referred</NavLink></li>
                    <li className={styles.navItem}><NavLink to="/client/services" className={styles.navLink} activeClassName={styles.navActive}><IoBody /> Services</NavLink></li>
                    <li className={styles.navItem}><NavLink to="/client/products" className={styles.navLink} activeClassName={styles.navActive}><IoBriefcase /> Products</NavLink></li>
                </ul>
                <hr className={styles.navLine}/>
            </nav>
            <Route path="/client" exact component={ClientFinance} />
            <Route path="/client/referrals" component={Referal} />
            <Route path="/client/services" component={Services} />
            <Route path="/client/products" component={Products} />
        </div>
    )
}

export default ClientInfo;