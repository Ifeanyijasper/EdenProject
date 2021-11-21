import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Activity2, Search } from "../../../components";
import styles from './FinanceList.module.css';
import search from '../../../utils/search';
import { setData } from '../../../redux/Actions/Data.actions';
import { BASE_URL } from "../../../utils/globalVariable";
import { DateString } from "../../../utils/date";
import { FinanceDetail } from "../..";

const FinanceList = (props) => {
    const {
        data, 
        user, 
        password
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState({});
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [purchases, setPurchases] = useState([]);
    const [filters] = useState([
        'Client',
        'Worker',
    ])

    useEffect(() => {
        search(text, data, setPurchases, filter.toLowerCase());
    }, [text]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}/purchase/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(user.username + ':' + password).toString('base64'),
            },
        })
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                let  _res = res.reverse().filter(data => data.client_id === user.id);
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
        setShow(true);
        setDetail(purchase);
    }

    return (
        <div className={`w-full`}>
            <Search 
                placeholder="Search" 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                newButton={false} 
                title="Purchase" 
                filters={filters} 
                filter={filter} 
                setFilter={setFilter}
                text={text}
                setText={setText} />
            <div className={styles.tableContainer}>
                <table className={"min-w-full rounded-xl my-3 overflow-hidden border-collapse block md:table"}>
                    <thead className={"block md:table-header-group"}>
                        <tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
                        <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Day</td>
                        <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Time</td>
                        <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Worker</td>
                        <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Total</td>
                        <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Details</td>
                        </tr>
                    </thead>
                    {isLoading ?
                        <tbody>
                            <tr>
                                <td colSpan={6}>
                                    <div className="flex justify-center"><Activity2 /></div>
                                </td>
                            </tr>
                        </tbody>
                        :
                        <tbody className="block md:table-row-group">
                            {purchases.map((purchase, index) =>
                                <tr key={ index} className={"bg-white py-2 px-3 md:p-3 md:border-none block md:table-row"}>
                                    <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span className="inline-block w-1/3 md:hidden font-bold">Day</span>{DateString(purchase.date)}</td>
                                    <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span className="inline-block w-1/3 md:hidden font-bold">Time</span>{new Date(purchase.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span className="inline-block w-1/3 md:hidden font-bold">Worker</span>{purchase.worker}</td>
                                    <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span className="inline-block w-1/3 md:hidden font-bold">Total</span>{purchase.total}</td>
                                    <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span className="inline-block w-1/3 md:hidden font-bold">Details</span>
                                        <button className={`outline-none text-sm text-primary font-semibold rounded tracking-wider cursor-pointer py-1.5 px-2.5 shadow-md`} onClick={() => showDetail(purchase)}>Details</button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                    } 
                </table>
            </div>
            <FinanceDetail show={show} setShow={setShow} detail={detail} />
        </div>
    )
}

const mapStateToProps = ({auth, data}) => {
    return {
        user: auth.user,
        password: auth.password,
        data: data.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceList);
