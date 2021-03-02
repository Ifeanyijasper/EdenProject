import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { 
    Activity2, 
    ClientCard, 
    Notification, 
    RouteIndicator, 
    Search 
} from '../../../components';
import styles from './WorkerList.module.css';
import { AddWorker } from '../..';
import { BASE_URL } from '../../../utils/globalVariable';
import search from '../../../utils/search';
import {setData} from '../../../redux/Actions/Data.actions';

const WorkerList = (props) => {
    const {
        setDetail, 
        setIsDetail, 
        isDetail, 
        detail, 
        username, 
        password,
        data,
        refresh,
    } = props;
    const [loading, setLoading] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});
    const [text, setText] = useState('');
    const [filter, setFilter] = useState('');
    const [filters] = useState([
        'Username',
        'Invited',
    ])
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(`${BASE_URL}/register/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            },
        })
            .then(response => {
                console.log(response);
                const res = response.json();
                return res;
            })
            .then(res => {
                let _workers = res.filter(data => data.is_worker);
                setWorkers(_workers);
                props.setData(_workers);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setNotify(true);
                setMsg({
                    title: 'Authentication',
                    message: 'Invalid username or password.'
                })
            })
    }, [isOpenAdd, refresh]);

    useEffect(() => {
        search(text, data, setWorkers, filter.toLowerCase());
    }, [text]);

    return (
        <div className={isDetail ? styles.listContainerDetail : styles.listContainer}>
            <RouteIndicator route="Dashboard" current="Workers" />
            <Search placeholder="Search" isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} newButton={true} title={'Worker'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            <h2 className={styles.headerTitle}>{workers.length || 0} Worker{workers.length !== 1 &&'s'}</h2>
            <div className={styles.cardsContainer}>
                {loading ? (<div style={{margin: 'auto'}}><Activity2 /></div>) :(workers.map((worker) => 
                    <ClientCard client={worker} detail={detail} setDetail={setDetail} setIsDetail={setIsDetail} />
                ))}
            </div>
            <Notification notify={notify} setNotify={setNotify} msg={msg} />
            <AddWorker isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />
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
    return bindActionCreators({setData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkerList);
