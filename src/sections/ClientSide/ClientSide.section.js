import React from 'react';
import { IoBarChart, IoCard, IoLocation, IoMail, IoPeople, IoPhonePortrait, IoWallet } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

import { img_4 } from '../../res/images';
import styles from './ClientSide.module.css';

const ClientSide = () => {
    return (
        <div className={styles.clientSide}>
            <div className={styles.imageContainer}>
                <img src={img_4} alt="Client Name" className={styles.userImage} />
            </div>
            <div className={styles.clientInfoContainer}>
                <p className={styles.clientInfoTitle}>Contact</p>
                <h2 className={styles.clientInfoDetails}><IoCard className={styles.clientIcon} />$James345</h2>
                <h2 className={styles.clientInfoDetails}><IoMail className={styles.clientIcon} />brownjames@gmail.com</h2>
                <h2 className={styles.clientInfoDetails}><IoLocation className={styles.clientIcon} />Tarred Malingo </h2>
                <h2 className={styles.clientInfoDetails}><IoPhonePortrait className={styles.clientIcon} />681-726-633 </h2>
            </div>
            <div className={styles.clientInfoContainer}>
                <p className={styles.clientInfoTitle}>Details</p>
                <h2 className={styles.clientInfoDetails}><IoBarChart className={styles.clientIcon} /> Rank | 23</h2>
                <h2 className={styles.clientInfoDetails}><IoPeople className={styles.clientIcon} /> Invited | 3</h2>
                <h2 className={styles.clientInfoDetails}><IoWallet className={styles.clientIcon} /> Total Expense | 23,000 FCFA</h2>
            </div>
            <div className={styles.footerContainer}>
                <p className={styles.footerContainerText}>Copyright @ <NavLink to='/summit-tech' className={styles.footerLink}>Summit Tech</NavLink></p>
            </div>
        </div>
    )
}

export default ClientSide;
