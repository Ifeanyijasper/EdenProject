import React from "react";
import { IoClose } from "react-icons/io5";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "../../../components";
import { img_1, img_3 } from "../../../res/images";
import extractInitials from "../../../utils/extractIni";
import { BASE_URL } from "../../../utils/globalVariable";
import {setRefresh} from '../../../redux/Actions/Refresh.actions';
import styles from './FinanceDetail.module.css';
import { DateString } from "../../../utils/date";

const FinanceDetail = (props) => {
    const {isDetail, setIsDetail, detail, user, password} = props;

    const authenticate = (id) => {
        fetch(`${BASE_URL}/purchase/${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Basic ' + Buffer.from(user.username + ':' + password).toString('base64'),
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
                <h3 className={styles.workerName}>Server's Name: {detail.worker}</h3>
                <h3 className={styles.workerName}>Served: {DateString(new Date(detail.date).toLocaleDateString())} at {new Date(detail.date).toLocaleTimeString('en-US')}</h3>
                {/* <h2 className={styles.subTitle}>Bonuses</h2> */}
                {/* <div className={styles.progress}>
                    <MiniProgressBar progress={(detail.total/1000)/10 || 0} />
                    <p>{((detail.total/1000)).toFixed(2)} / 1000 points</p>
                </div> */}
                <h2 className={styles.subTitle}>Items</h2>
                <ol className={styles.list}>
                {detail.item !== null && detail.item !== undefined && detail.item.map((item, index) => (
                        <li>{item.name} &times; {item.count} = {item.price * item.count} XAF</li>
                        ))}
                </ol>
                <h2 className={styles.subTitle}>Total = {detail.total} XAF</h2>
            </div>
            <div className={styles.detailActions}>
                {user.is_superuser && <Button title="Delete" type="danger" onClick={() => authenticate(detail.id)} />}
                <Button title={"Close"} onClick={() => setIsDetail(false)} />
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
    return bindActionCreators({setRefresh}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceDetail);
