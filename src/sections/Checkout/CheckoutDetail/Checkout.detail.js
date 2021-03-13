import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, MiniProgressBar, Notification } from "../../../components";
import { img_1, img_3 } from "../../../res/images";
import extractInitials from "../../../utils/extractIni";
import { BASE_URL } from "../../../utils/globalVariable";
import {setRefresh} from '../../../redux/Actions/Refresh.actions';
import styles from './CheckoutDetail.module.css';

const CheckoutDetail = (props) => {
    const {isDetail, setIsDetail, detail, user, password} = props;
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});

    const updateMyBonus = (id, myBonus) => {
        const body = {
            my_bonus: myBonus,
        }
        fetch(`${BASE_URL}/register/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(user.username + ':' + password).toString('base64'),
            },
            body: JSON.stringify(body),
        })
        .then(res => {
            const response = res.json();
            return response;
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            setNotify(true);
            setMsg({
                title: 'Unexpected Error',
                message:'Please try again later.'
            })
        })
    }

    const updateReferBonus = (id, Bonus) => {
        const body = {
            refer_bonus: Bonus,
        }
        fetch(`${BASE_URL}/register/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(user.username + ':' + password).toString('base64'),
            },
            body: JSON.stringify(body),
        })
        .then(res => {
            const response = res.json();
            return response;
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            setNotify(true);
            setMsg({
                title: 'Unexpected Error',
                message:'Please try again later.'
            })
        })
    }

    const Process = (detail) => {
        const body = {
            status: 'Processed'
        }
        fetch(`${BASE_URL}/Checkout/${detail.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(user.username + ':' + password).toString('base64'),
            },
            body: JSON.stringify(body),
        })
        .then(res => {
            console.log(res);
            const response = res.json();
            return Promise.all([response]);
        })
        .then(res => {
            if(res[0].status === "Processed") {
                if (detail.bonus === 'My Bonuses') {
                    updateMyBonus(detail.client_id, 0);
                    props.setRefresh(true);
                    setIsDetail(false);
                } else {
                    updateReferBonus(detail.client_id, 0);
                }
            }
            setNotify(true);
            setMsg({
                title: 'Success',
                message:'Checkout processed successfully'
            }) 
        })
        .catch(err => {
            console.log(err);
            setNotify(true);
            setMsg({
                title: 'Unexpected Error',
                message:'Please try again later.'
            })
        })
    }

    return (
        <div className={isDetail ? styles.detailContainer : styles.detailHide}>
            <div className={styles.imgsContainer}>
                {detail.clientImage ? 
                    (<img src={img_1} alt={"Client Name"} className={styles.clientImage} />) :
                    (<h2 className={styles.clientIni}>{extractInitials(detail.client)}</h2>)
                }
                {detail.workerImage ? 
                    (<img src={img_3} alt={"Woker Name"} className={styles.workerImage} />) : 
                    (<h2 className={styles.workerIni}>{extractInitials(detail.worker)}</h2>)
                }
            </div>
            <div className={styles.infoContainer}>
                <h3 className={styles.clientName}>Client's Name: {detail.client}</h3>
                <h2 className={styles.clientName}>Bonus : {detail.bonus}</h2>
                <h3 className={styles.workerName}>Sent: {new Date(detail.date).toLocaleDateString()} at {new Date(detail.date).toLocaleTimeString('en-US')}</h3>
                {/* <div className={styles.progress}>
                    <MiniProgressBar progress={(detail.total/1000)/10 || 0} />
                    <p>{((detail.total/1000)).toFixed(2)} / 1000 points</p>
                </div> */}
                <h2 className={styles.subTitle}>Total = {detail.amount} XAF</h2>
            </div>
            <div>
                {detail.status === 'Pending' && <Button title={"Process"} onClick={() => Process(detail)} />}
                <Button title={"Close"} onClick={() => setIsDetail(false)} />
            </div>
            <Notification notify={notify} setNotify={setNotify} msg={msg} />
        </div>
    )
}

const mapStateToProps = ({auth}) => {
    return {
        password: auth.password,
        user: auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setRefresh}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDetail);
