import React, {useEffect, useState} from "react";
import { NewPurchase } from "../..";

import { Activity, RouteIndicator, Search } from "../../../components";
import styles from './FinanceList.module.css';
import search from '../../../utils/search';
import { BASE_URL } from "../../../utils/globalVariable";
import { connect } from "react-redux";

const FinanceList = (props) => {
    const {isDetail, setIsDetail, username, password, setDetail} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [finances, setFinances] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [purchases, setPurchases] = useState([]);
    const [filter, setFilter] = useState('');
    const [filters] = useState([
        'Client name',
        'Worker name',
        'Price',
    ]);

    useEffect(() => {
        search(text, finances, setFinances);
    }, [text]);

    useEffect(() => {
        fetch(`${BASE_URL}/purchase/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            },
        })
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                setIsLoading(false);
                console.log(res);
                let  _res = res.reverse();
                setPurchases(_res);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
        
    }, [isOpen,]);

    const showDetail = (purchase) => {
        setIsDetail(!isDetail);
        setDetail(purchase);
    }

    return (
        <div className={isDetail ? styles.listContainerDetail : styles.listContainer}>
            <RouteIndicator route="Dashboard" current="Finances" />
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
                    {purchases.map((purchase, index) => 
                        (<tr className={styles.tableRow}>
                            <td className={styles.tableData}>{purchase.client}</td>
                            <td className={styles.tableData}>{new Date(purchase.date).toLocaleTimeString('en-US')}</td>
                            <td className={styles.tableData}>{purchase.worker}</td>
                            <td className={styles.tableData}>{purchase.total}</td>
                            <td className={styles.tableData}><button className={styles.tableButton} onClick={() => showDetail(purchase)}>Details</button></td>
                        </tr>)
                    )
                    }
                    
                </table>
            </div>
            <Activity />
            <NewPurchase isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

const mapStateToProps = ({auth}) => {
    return {
        username: auth.username,
        password: auth.password,
    }
}

export default connect(mapStateToProps)(FinanceList);
