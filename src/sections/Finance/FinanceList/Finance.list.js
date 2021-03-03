import React, {useEffect, useState} from "react";
import { NewPurchase } from "../..";

import { Activity, Activity2, RouteIndicator, Search } from "../../../components";
import styles from './FinanceList.module.css';
import search from '../../../utils/search';
import { BASE_URL } from "../../../utils/globalVariable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setData } from '../../../redux/Actions/Data.actions';

const FinanceList = (props) => {
    const {
        isDetail, 
        setIsDetail, 
        username, 
        password, 
        setDetail,
        data,
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [finances, setFinances] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [purchases, setPurchases] = useState([]);
    const [filter, setFilter] = useState('');
    const [filters] = useState([
        'Client',
        'Worker',
    ]);

    useEffect(() => {
        search(text, data, setPurchases, filter.toLowerCase());
    }, [text]);

    useEffect(() => {
        setIsLoading(true);
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
                let  _res = res.reverse();
                props.setData(_res);
                setPurchases(_res);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
        
    }, [isOpen]);

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
            {/* <h2 className={styles.durationTitle}>Today</h2> */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <td className={styles.tableHeadData}>Client Name</td>
                        <td className={styles.tableHeadData}>Time</td>
                        <td className={styles.tableHeadData}>Worker</td>
                        <td className={styles.tableHeadData}>Total</td>
                        <td className={styles.tableHeadData}>Details</td>
                    </thead>
                    {isLoading ? (<td colSpan={5} style={{margin: 'auto', paddingTop: '10px'}}><Activity2 /></td>) : purchases.map((purchase, index) => 
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
            <NewPurchase isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

const mapStateToProps = ({auth, data}) => {
    return {
        username: auth.username,
        password: auth.password,
        data: data.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceList);
