import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { EditService } from '../..';
import { Button } from '../../../components';
import extractInitials from '../../../utils/extractIni';
import { BASE_URL } from '../../../utils/globalVariable';
import styles from './ServiceDetail.module.css';
import {setRefresh} from '../../../redux/Actions/Refresh.actions';

const ServiceDetail = (props) => {
    const {
        isDetail, 
        setIsDetail, 
        detail
    } = props;
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        props.setRefresh(false);
    }, [isDetail]);

     const authenticate = (id) => {
        fetch(`${BASE_URL}/service/${id}/`, {
            method: 'DELETE'
        })
        .then(res => {
            props.setRefresh(true);
            setIsDetail(false);
        })
        .catch(err => {
            console.log(err);
        })
    };

    return (
        <div className={isDetail ? styles.detailContainer : styles.detailHide}>
            <button className={styles.close} onClick={() => setIsDetail(!isDetail)}><IoClose /></button>
            <div className={styles.imgsContainer}>
                {
                    detail.img ?
                    <img src={detail.img} alt="Name" className={styles.clientImage} /> :
                    <h3 className={styles.serviceIni}>{extractInitials(detail.name)}</h3>
                }
            </div>
            <div className={styles.infoContainer}>
                <h3 className={styles.clientName}>Service Name: {detail.name} </h3>
                <h2 className={styles.subTitle}>Details</h2>
                <ol className={styles.list}>
                    {/* <li>Likes: 34</li> */}
                    <li>Discount: {Math.floor(Number(detail.discount))}%</li>
                    <li>Original Price: {Math.floor(Number(detail.price))} XAF</li>
                    {Number(detail.discount) !== 0 && <li>Discount Price: {((100 - Number(detail.discount))/100) * Number(detail.price)} XAF</li>}
                </ol>
                <h2 className={styles.subTitle}>About</h2>
                <p className={styles.list}>
                    {detail.description}
                    <h2 className={styles.price}>Price = {Number(detail.discount) ? ((100 - Number(detail.discount))/100) * Number(detail.price) :  Number(detail.price) } XAF</h2>   
                </p>
            </div>
            <div>
                <Button title={"Delete"} type="danger" onClick={() => authenticate(detail.id)} />
                <Button title={"Edit"} onClick={() => setIsOpen(!isOpen)} />
            </div>
            <EditService detail={detail} isOpen={isOpen} setIsOpen={setIsOpen} setIsDetail={setIsDetail} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setRefresh}, dispatch)
}

export default connect(null, mapDispatchToProps)(ServiceDetail);
