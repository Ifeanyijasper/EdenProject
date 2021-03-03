import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { EditClient } from '../..';
import { Button, MiniProgressBar, ReferCard } from '../../../components';
import extractInitials from '../../../utils/extractIni';
import { BASE_URL } from '../../../utils/globalVariable';
import styles from './ClientDetail.module.css';
import {setRefresh} from '../../../redux/Actions/Refresh.actions';

const ClientDetail = (props) => {
    const {
        detail, 
        isDetail, 
        setIsDetail,
        username,
        password,
        clients,
        table,
        user,
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [referers, setReferers] = useState([]);
    const [mypoints, setPoints] = useState(0);
    const [referPoints, setReferPoints] = useState(0);

    useEffect(() => {
        props.setRefresh(false);
    }, [isDetail]);

    useEffect(() => {
        fetch(`${BASE_URL}/purchase/`, {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            }
        })
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                let _points = 0 ;
                let points = res.filter(data => data.client_id === detail.id);
                _points = points.reduce((sum, {point}) => sum + point, 0);
                setPoints(_points);
                let referPoints = table.filter(data => data.friend === detail.id);
                let _referPoints = referPoints.reduce((sum, {points}) => sum + points, 0);
                setReferPoints(_referPoints);
            })
            .catch(err => {
                console.log(err);
            })
    }, [detail])

    useEffect(() => {
        let _referers = clients.filter(data => data.friend === detail.id);
        setReferers(_referers);
    }, [detail]);

    const authenticate = (id) => {
        fetch(`${BASE_URL}/register/${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            }
        })
        .then(res => {
            props.setRefresh(true);
            setIsDetail(false);
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={isDetail ? styles.detailContainer : styles.detailHide}>
            <button className={styles.close} onClick={() => setIsDetail(!isDetail)}><IoClose /></button>
            <div className={styles.clientDetails}>
                {
                    detail.img ? 
                    (<img src={detail.img} alt="Client Name" className={styles.clientImage} />) : 
                    (<h2 className={styles.clientIni}>{detail.fullname ? extractInitials(detail.fullname) : extractInitials(detail.username)}</h2>)
                }
                <h2 className={styles.clientContact}>{detail.fullname || detail.username} | {detail.phone}</h2>
                <h2 className={styles.clientContact}>Invited: {referers.length}</h2>
            </div>
            <h2 className={styles.subTitle}>My Bonuses</h2>
            <div className={styles.progress}>
                <MiniProgressBar progress={detail.my_bonus/100 || 0} />
                <p>{detail.my_bonus || 0} / 10,000 XAF</p>
            </div>
            <h2 className={styles.subTitle}>Refer Bonuses</h2>
            <div className={styles.progress}>
                <MiniProgressBar progress={detail.refer_bonus/100 || 0} />
                <p>{detail.refer_bonus || 0} / 10,000 XAF</p>
            </div>
            <div className={styles.actions}>
            </div>
            <div className={styles.referedList}>
                {referers.map((referer, index) => <ReferCard refer={referer} key={referer.id} />)}
            </div>
            <div className={styles.detailActions}>
                {user.is_superuser && <Button title="Delete" type="danger" onClick={() => authenticate(detail.id)} />}
                <Button title="Edit" onClick={() => setIsOpen(!isOpen)} />
            </div>
            <EditClient isOpen={isOpen} setIsOpen={setIsOpen} detail={detail} setIsDetail={setIsDetail} />
        </div>
    )
}

const mapStateToProps = ({auth, data, points}) => {
    return {
        username: auth.username,
        password: auth.password,
        clients: data.data,
        table: points.table,
        user: auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setRefresh}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetail);
