import React, {useEffect, useState} from "react";
import { NewPurchase } from "../..";

import { Activity2, RouteIndicator, Search } from "../../../components";
import styles from './CheckoutList.module.css';
import search from '../../../utils/search';
import { BASE_URL } from "../../../utils/globalVariable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setData } from '../../../redux/Actions/Data.actions';

const CheckoutList = (props) => {
    const {
        isDetail, 
        setIsDetail, 
        username, 
        password, 
        setDetail,
        data,
        refresh,
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [checkouts, setCheckouts] = useState([]);
    const [filter, setFilter] = useState('');
    const [filters] = useState([
        'Client',
        'Status',
        'Bonus',
    ]);

    useEffect(() => {
        search(text, data, setCheckouts, filter.toLowerCase());
    }, [text]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}/Checkout/`, {
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
                setCheckouts(_res);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
        
    }, [isOpen, refresh]);

    const showDetail = (purchase) => {
        setIsDetail(!isDetail);
        setDetail(purchase);
    }

    return (
        <div className={isDetail ? styles.listContainerDetail : styles.listContainer}>
            <RouteIndicator route="Dashboard" current="Checkouts" />
            <Search 
                placeholder="Search" 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                newButton={false} 
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
                        <td className={styles.tableHeadData}>Status</td>
                        <td className={styles.tableHeadData}>Bonus</td>
                        <td className={styles.tableHeadData}>Total</td>
                        <td className={styles.tableHeadData}>Details</td>
                    </thead>
                    {isLoading ? (<td colSpan={5} style={{margin: 'auto', paddingTop: '10px'}}><Activity2 /></td>) : checkouts.map((checkout, index) => 
                        (<tr className={styles.tableRow}>
                            <td className={styles.tableData}>{checkout.client}</td>
                            <td className={styles.tableData}>{new Date(checkout.date).toLocaleTimeString('en-US')}</td>
                            <td className={styles.tableData}>{checkout.status}</td>
                            <td className={styles.tableData}>{checkout.bonus}</td>
                            <td className={styles.tableData}>{checkout.amount}</td>
                            <td className={styles.tableData}><button className={styles.tableButton} onClick={() => showDetail(checkout)}>Details</button></td>
                        </tr>)
                    )
                    }
                    
                </table>
            </div>
            {/* <NewPurchase isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        </div>
    )
}

const mapStateToProps = ({auth, data, refresh}) => {
    return {
        username: auth.username,
        password: auth.password,
        data: data.data,
        refresh: refresh.refresh,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutList);
