import React, {useEffect, useState} from "react";
import { IoDownload } from "react-icons/io5";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactHTMLToExcel from 'react-html-table-to-excel';

import { NewPurchase } from "../..";
import { Activity2, RouteIndicator, Search } from "../../../components";
import styles from './FinanceList.module.css';
import { BASE_URL } from "../../../utils/globalVariable";
import { setObjData, setFinances } from '../../../redux/Actions/Data.actions';
import { DateString } from "../../../utils/date";
import searchObj from "../../../utils/searchObj";

const FinanceList = (props) => {
    const {
        isDetail,
        setIsDetail,
        username,
        password,
        setDetail,
        _finances,
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [purchases, setPurchases] = useState({});
    const [msg, setMsg] = useState({});
    const [notify, setNotify] = useState(false);
    const [filter, setFilter] = useState('');
    const [filters] = useState([
        'Month'
    ]);


     useEffect(() => {
        setPurchases(_finances)
        if (_finances?.length === 0) {
            setIsLoading(true);
            fetchPurchases();
        }
        return () => {
            fetchPurchases()
        }
     }, [_finances]);

    const fetchPurchases = async () => {
        try {
            const response = await fetch(`${BASE_URL}/purchase/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
                },
            });
            let purchases = await response.json();
            purchases = purchases.reverse();
            console.log(purchases)
            let obj = {};
            const data = (finances) => {
                finances.map((i) => {
                    let _date = new Date(i.date).toLocaleDateString()
                    if (obj[_date] === undefined) {
                        obj[_date] = [i];
                    } else {
                        obj[_date].push(i);
                    }
                });
                return obj;
            }
            purchases = data(purchases);
            props.setFinances(purchases);
            setIsLoading(false);
            return purchases;
        }
        catch (err) {
            console.log(err, 'Received error');
            setIsLoading(false);
            setNotify(true);
            setMsg({
                title: 'Authentication',
                message: 'Invalid username or password.'
            })
        }
    };

    useEffect(() => {
        searchObj(text, _finances, setPurchases, filter.toLowerCase());
    }, [text]);

    const showDetail = (purchase) => {
        setIsDetail(!isDetail);
        setDetail(purchase);
    }

    return (
        <div className={'isDetail ? styles.listContainerDetail : styles.listContainer'}>
            <RouteIndicator route="Dashboard" current="Finances" />
            <div className="sticky -top-4 md:top-3 z-40 pt-1">
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
            </div>
            {isLoading ? <div className={styles.actCenter}><Activity2 /></div> : Object.values(purchases).map((finances, index) =>
                <>
                    <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>{DateString(Object.keys(purchases)[index])}</h2>
                    <div className={styles.tableContainer}>
                        <table className={"min-w-full rounded-xl my-3 overflow-hidden border-collapse block md:table"} id={DateString(Object.keys(purchases)[index])}>
                            <thead className={"block md:table-header-group"}>
                                <tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
                                    <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Client Name</td>
                                    <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Time</td>
                                    <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Worker</td>
                                    <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Items</td>
                                    <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Total</td>
                                    <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Actions</td>
                                </tr>
                            </thead>
                            <tbody className="block md:table-row-group">
                            {isLoading ? (<td colSpan={5} style={{ margin: 'auto', paddingTop: '10px' }}><Activity2 /></td>) : finances.map((finance, index) =>
                            (<tr className={"bg-white py-2 px-3 md:p-3 md:border-none block md:table-row"}>
                                <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span class="inline-block w-1/3 md:hidden font-bold">Client Name</span>{finance.client}</td>
                                <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span class="inline-block w-1/3 md:hidden font-bold">Time</span>{new Date(finance.date).toLocaleTimeString('en-US')}</td>
                                <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span class="inline-block w-1/3 md:hidden font-bold">Worker</span>{finance.worker}</td>
                                <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span class="inline-block w-1/3 md:hidden font-bold">Items</span>
                                    {finance.item.map((item, index) =>
                                        <b className={'mr-3 font-normal'}>({item.count}) {item.name} </b>
                                    )}
                                </td>
                                <td className={"p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span class="inline-block w-1/3 md:hidden font-bold">Total</span>{finance.total}</td>
                                <td className={"p-3 md:border md:border-grey-500 text-left block md:table-cell"}>
                                    <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
                                    <button className={`outline-none text-sm text-primary font-semibold rounded tracking-wider cursor-pointer py-1.5 px-2.5 shadow-md`} onClick={() => showDetail(finance)}>Details</button>
                                </td>
                            </tr>)
                            )}
                            </tbody>
                        </table>
                    </div>
                    <ReactHTMLToExcel
                        table={DateString(Object.keys(purchases)[index])}
                        filename={`${DateString(Object.keys(purchases)[index])}finances`}
                        sheet="Sheet"
                        className={'outline none p-2 rounded bg-primary shadow-md text-white mb-4'}
                        buttonText={"Export Excel"}
                    />
                </>)}
            <NewPurchase isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
};

const mapStateToProps = ({auth, data, refresh}) => {
    return {
        username: auth.username,
        password: auth.password,
        _finances: data.finances,
        refresh: refresh.refresh,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setObjData, setFinances}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceList);
