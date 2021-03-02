import React, {useEffect, useState} from "react";
import { NewPurchase } from "../..";

import { Search } from "../../../components";
import styles from './FinanceList.module.css';
import search from '../../../utils/search';

const FinanceList = (props) => {
    const {isDetail, setIsDetail} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [filter, setFilter] = useState('');
    const [finances, setFinances] = useState([]);
    const [filters] = useState([
        'Client name',
        'Worker name',
        'Price',
    ])

    useEffect(() => {
        search(text, finances, setFinances);
    }, [text]);

    return (
        <div className={isDetail ? styles.listContainerDetail : styles.listContainer}>
            <Search 
                placeholder="Search" 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                newButton={true} 
                title="Purchase" 
                filters={filters} 
                filter={filter} 
                setFilter={setFilter} 
                text={text}
                setText={setText} />
            <h2 className={styles.durationTitle}>Today</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <td className={styles.tableHeadData}>Client Name</td>
                        <td className={styles.tableHeadData}>Time</td>
                        <td className={styles.tableHeadData}>Worker</td>
                        <td className={styles.tableHeadData}>Total</td>
                        <td className={styles.tableHeadData}>Details</td>
                    </thead>
                    <tr className={styles.tableRow}>
                        <td className={styles.tableData}>James Brown</td>
                        <td className={styles.tableData}>01:00PM</td>
                        <td className={styles.tableData}>Shalot</td>
                        <td className={styles.tableData}>29,000</td>
                        <td className={styles.tableData}><button className={styles.tableButton} onClick={() => setIsDetail(!isDetail)}>Details</button></td>
                    </tr>
                </table>
            </div>
            <NewPurchase isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default FinanceList;
