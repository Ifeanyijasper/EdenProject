import React, {useEffect, useState} from "react";
import { IoDownload } from "react-icons/io5";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactHTMLToExcel from 'react-html-table-to-excel';

import { NewPurchase } from "../..";
import { Activity2, RouteIndicator, Search } from "../../../components";
import styles from './FinanceList.module.css';
import { BASE_URL } from "../../../utils/globalVariable";
import { setObjData } from '../../../redux/Actions/Data.actions';
import { DateString } from "../../../utils/date";
import searchObj from "../../../utils/searchObj";

const FinanceList = (props) => {
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
    const [purchases, setPurchases] = useState({});
    const [filter, setFilter] = useState('');
    const [filters] = useState([
        'Month'
    ]);

    useEffect(() => {
        searchObj(text, data, setPurchases, filter.toLowerCase());
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
                let obj = {};
                const data = (finances) => {
                    finances.map((i) => {
                        let _date = new Date(i.date).toLocaleDateString()
                        if(obj[_date] === undefined) {
                            obj[_date] = [i];
                            } else {
                                obj[_date].push(i);  
                            } 
                        });
                        return obj;
                }
                let sortedData = data(_res);
                props.setObjData(sortedData);
                console.log(sortedData)
                setPurchases(sortedData);
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
            {isLoading ? <div className={styles.actCenter}><Activity2 /></div> : Object.values(purchases).map((finances, index) => 
            <>
                <h2 className={styles.durationTitle}>{DateString(Object.keys(purchases)[index])}</h2>
                <div className={styles.tableContainer}>
                    <table className={styles.table} id={DateString(Object.keys(purchases)[index])}>
                        <thead className={styles.tableHead}>
                            <td className={styles.tableHeadData}>Client Name</td>
                            <td className={styles.tableHeadData}>Time</td>
                            <td className={styles.tableHeadData}>Worker</td>
                            <td className={styles.tableHeadData}>Items</td>
                            <td className={styles.tableHeadData}>Total</td>
                            <td className={styles.tableHeadData}>Details</td>
                        </thead>
                        {isLoading ? (<td colSpan={5} style={{margin: 'auto', paddingTop: '10px'}}><Activity2 /></td>) : finances.map((finance, index) => 
                            (<tr className={styles.tableRow}>
                                <td className={styles.tableData}>{finance.client}</td>
                                <td className={styles.tableData}>{new Date(finance.date).toLocaleTimeString('en-US')}</td>
                                <td className={styles.tableData}>{finance.worker}</td>
                                <td className={styles.tableData}>
                                    {finance.item.map((item, index) => <b className={styles.items}>{item.name} &times; {item.count}</b>)}
                                </td>
                                <td className={styles.tableData}>{finance.total}</td>
                                <td className={styles.tableData}><button className={styles.tableButton} onClick={() => showDetail(finance)}>Details</button></td>
                            </tr>)
                        )}
                    </table>
                </div>
                <ReactHTMLToExcel 
                    table={DateString(Object.keys(purchases)[index])} 
                    filename={`${DateString(Object.keys(purchases)[index])}finances`} 
                    sheet="Sheet"
                    className={styles.excelButton}
                    buttonText={"Export Excel"}
                />
            </>)}
            <NewPurchase isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

const mapStateToProps = ({auth, data, refresh}) => {
    return {
        username: auth.username,
        password: auth.password,
        data: data.objdata,
        refresh: refresh.refresh,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setObjData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceList);
