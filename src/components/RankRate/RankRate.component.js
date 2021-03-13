import React, { useState } from 'react';
import { IoWallet } from 'react-icons/io5';
import { connect } from 'react-redux';

import { Button, Notification } from '..';
import { Checkout } from '../../sections';
import { BASE_URL } from '../../utils/globalVariable';
import styles from './RankRate.module.css';

const RankRate = (props) => {
    const {user, bonus, rate, password} = props;

    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});

    const Checkout = () => {
        if (Number(rate) < 10000) {
            setNotify(true);
            setMsg({
                title: 'Cannot checkout',
                message: 'Your bonuses is not up to the required amount'
            })
            console.log('Did not checkout')
        } else {
            let _bonus = '';
            let amount;
            if (bonus === 'refer_bonus') {
                _bonus = 'Refer Bonuses';
                amount = user.refer_bonus
            } else {
                _bonus = 'My Bonuses';
                amount = user.my_bonus
            }
            const body = {
                status: 'Pending',
                client_id: user.id,
                client: user.fullname || user.username ,
                bonus: _bonus,
                amount,
                phone: user.phone
            }
    
    
            fetch(`${BASE_URL}/Checkout/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(user.username + ':' + password).toString('base64'),
                },
                body: JSON.stringify(body),
            })
            .then(res => {
                console.log(res);
            })
            .then(res => {
    
            })
            .catch(err => {
                console.log(err);
            })
        }
    }


    return (
        <>
            <div className={styles.rankRate}>
                <div className={styles.rankProgress}>
                    <div className={styles.rateContainer} style={{width: 250}}><div className={styles.rateBar} style={{width: (rate * 0.01 * 2.5) }} /></div>
                    <h2 className={styles.rank}>{rate} / 10,000 XAF</h2>
                </div>
                <button className={[styles.rateButton, (rate >= 10000) ? styles.rateActivate : styles.rateDeactivate].join(' ')} onClick={() => Checkout()}><IoWallet className={styles.rateIcon} />Checkout</button>
            </div>
            <Notification notify={notify} setNotify={setNotify} msg={msg} />
        </>
    )
}

const mapStateToProps = ({auth}) => {
    return {
        password: auth.password,
    }
}

export default connect(mapStateToProps)(RankRate);

