import React, { useState } from 'react';
import { IoWallet } from 'react-icons/io5';
import { connect } from 'react-redux';

import { Notification } from '..';
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
                // console.log(res);
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
            <div className={'flex items-baseline w-9/10 md:w-4/5 justify-start'}>
                <div className={'w-full flex flex-col items-center justify-center'}>
                    <div className={'h-2 rounded overflow-hidden bg-gray-400 mb-1 w-9/10 md:w-4/5'}><div className={styles.rateBar} style={{width: `${(rate / 100)}%` }} /></div>
                    <h2 className={'text-gray-600 text-sm'}>{rate} / 10,000 XAF</h2>
                </div>
                <button className={`flex items-center justify-center outline-none text-sm text-primary bg-white rounded tracking-wider py-2 px-2.5 shadow-md ml-4 ${rate < 10000 ? 'cursor-not-allowed' : 'cursor-pointer' }`} onClick={() => Checkout()}><IoWallet className={'mr-2'} />Checkout</button>
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

