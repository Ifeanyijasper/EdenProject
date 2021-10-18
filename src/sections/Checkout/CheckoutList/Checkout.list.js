import React, {useEffect, useState} from "react";
import { NewPurchase } from "../..";

import { Activity2, RouteIndicator, Search } from "../../../components";
import styles from './CheckoutList.module.css';
import search from '../../../utils/search';
import { BASE_URL } from "../../../utils/globalVariable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setData, setCheckouts } from '../../../redux/Actions/Data.actions';

const CheckoutList = (props) => {
    const {
        isDetail, 
        setIsDetail, 
        username, 
        password, 
        setDetail,
        _checkouts,
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [notify, setNotify] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({});
    const [checkouts, setCheckouts] = useState([]);
    const [filter, setFilter] = useState('');
    const [filters] = useState([
        'Client',
        'Status',
        'Bonus',
    ]);

    useEffect(() => {
        search(text, _checkouts, setCheckouts, filter.toLowerCase());
    }, [text]);

    useEffect(() => {
        setCheckouts(_checkouts)
        if (_checkouts?.length === 0) {
            setIsLoading(true);
            fetchCheckouts();
        }
        return () => {
            fetchCheckouts()
        }
    }, [_checkouts]);

    const fetchCheckouts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/Checkout/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
                },
            });
            let checkouts = await response.json();
            checkouts = checkouts.filter(data => data.is_client)
            props.setCheckouts(checkouts.sort((a, b) => { return b.served - a.served }));
            setIsLoading(false);
            return checkouts;
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

    const showDetail = (purchase) => {
        setIsDetail(!isDetail);
        setDetail(purchase);
    }

    return (
        <div className={isDetail ? styles.listContainerDetail : styles.listContainer}>
            <RouteIndicator route="Dashboard" current="Checkouts" />
            <div className="sticky -top-4 md:top-3 z-40 pt-1">
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
                </div>
            {/* <h2 className={styles.durationTitle}>Today</h2> */}
            <div className={styles.tableContainer}>
                <table className={"min-w-full rounded-xl my-3 overflow-hidden border-collapse block md:table"}>
                    <thead className={"block md:table-header-group"}>
                        <tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
                        <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Client Name</td>
                        <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Time</td>
                        <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Status</td>
                        <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Bonus</td>
                        <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Total</td>
                        <td className={"bg-primary text-lg p-3.5 text-gray-100 font-semibold md:border md:border-grey-500 text-left block md:table-cell"}>Actions</td>
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                    {isLoading ? (<td colSpan={5} style={{margin: 'auto', paddingTop: '10px'}}><Activity2 /></td>) : checkouts.map((checkout, index) => 
                        (<tr className={"bg-white py-2 px-3 md:p-3 md:border-none block md:table-row"}>
                            <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span class="inline-block w-1/3 md:hidden font-bold">Client Name</span>{checkout.client}</td>
                            <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span class="inline-block w-1/3 md:hidden font-bold">Time</span>{new Date(checkout.date).toLocaleTimeString('en-US')}</td>
                            <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span class="inline-block w-1/3 md:hidden font-bold">Status</span>{checkout.status}</td>
                            <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span class="inline-block w-1/3 md:hidden font-bold">Bonus</span>{checkout.bonus}</td>
                            <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}><span class="inline-block w-1/3 md:hidden font-bold">Total</span>{checkout.amount}</td>
                        <td className={"py-2 px-3 md:p-3 md:border md:border-grey-500 text-left block md:table-cell"}>
                            <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
                            <button className={`outline-none text-sm text-primary font-semibold rounded tracking-wider cursor-pointer py-1.5 px-2.5 shadow-md`} onClick={() => showDetail(checkout)}>Details</button>
                        </td>
                        </tr>)
                    )
                    }
                    </tbody>
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
        _checkouts: data.checkouts,
        refresh: refresh.refresh,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData, setCheckouts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutList);
