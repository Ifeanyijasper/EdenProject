import React, { useEffect, useState } from 'react';

import { EditWorker } from '../..';
import { Button, ReferCard } from '../../../components';
import extractInitials from '../../../utils/extractIni';
import { BASE_URL } from '../../../utils/globalVariable';
import styles from './WorkerDetail.module.css';
import {setRefresh} from '../../../redux/Actions/Refresh.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IoClose } from 'react-icons/io5';

const WorkerDetail = (props) => {
    const {
        detail, 
        isDetail, 
        setIsDetail,
        username,
        password,
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        props.setRefresh(false);
    }, [isDetail]);

     const authenticate = (id) => {
        fetch(`${BASE_URL}/register/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            }
        })
        .then(res => {
            props.setRefresh(true);
            setIsDetail(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={isDetail ? styles.detailContainer : styles.detailHide}>
            <button className={styles.close} onClick={() => setIsDetail(!isDetail)}><IoClose /></button>
            <div className={styles.workerDetails}>
                {
                    detail.img ?
                    <img src={detail.img} alt="Worker Name" className={styles.workerImage} /> :
                    <h3 className={styles.workerIni}>{detail.fullname ? extractInitials(detail.fullname) : extractInitials(detail.username)}</h3>
                }
                <h2 className={styles.workerContact}>{detail.fullname || detail.username} | {detail.phone}</h2>
                <h2 className={styles.workerContact}>Served: {detail.numberOfClients}</h2>
            </div>
            <div className={styles.detailActions}>
                <Button title="Delete" type="danger" onClick={() => authenticate(detail.id)} />
                <Button title="Edit" onClick={() => setIsOpen(!isOpen)} />
            </div>
            <EditWorker isOpen={isOpen} setIsOpen={setIsOpen} detail={detail} setIsDetail={setIsDetail} />
        </div>
    )
}

const mapStateToProps = ({auth}) => {
    return {
        username: auth.username,
        password: auth.password,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setRefresh}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkerDetail);
