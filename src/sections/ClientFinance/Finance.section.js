import React, {useState} from "react";

import styles from './Finance.module.css';
import FinanceList from './FinanceList/Finance.list';
import FinanceDetail from './FinanceDetail/Finance.detail';

const Finance = () => {
    const [isDetail, setIsDetail] = useState(false);
    const [detail, setDetail] = useState({});
    return (
        <section className={styles.financeSection}>
            <FinanceList isDetail={isDetail} setIsDetail={setIsDetail} detail={detail} setDetail={setDetail}/>
            <FinanceDetail isDetail={isDetail} setIsDetail={setIsDetail} detail={detail} setDetail={setDetail}/>
        </section>
    )
}

export default Finance;
