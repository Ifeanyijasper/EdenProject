import React from "react";
import { Button } from "../../../components";
import { img_1, img_3 } from "../../../res/images";
import extractInitials from "../../../utils/extractIni";

import styles from './FinanceDetail.module.css';

const FinanceDetail = (props) => {
    const {isDetail, setIsDetail, detail} = props;
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
                <h3 className={styles.workerName}>Served: {new Date(detail.date).toLocaleDateString()} at {new Date(detail.date).toLocaleTimeString('en-US')}</h3>
                <h2 className={styles.subTitle}>Items</h2>
                <ol className={styles.list}>
                {detail.item !== null && detail.item !== undefined && detail.item.map((item, index) => (
                        <li>{item.name} &times; {item.count} = {item.price * item.count} XAF</li>
                        ))}
                </ol>
                <h2 className={styles.subTitle}>Total = {detail.total} XAF</h2>
            </div>
            <Button title={"Close"} onClick={() => setIsDetail(false)} />
        </div>
    )
}

export default FinanceDetail;
