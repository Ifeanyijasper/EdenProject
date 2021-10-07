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
import { AddWorker } from '../..';
import { BASE_URL } from '../../../utils/globalVariable';
import search from '../../../utils/search';
import { setData, setWorkers } from '../../../redux/Actions/Data.actions';

const WorkerList = (props) => {
    const {
        setDetail,
        setIsDetail,
        isDetail,
        detail,
        username,
        password,
        _workers,
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
        'Fullname',
    ])
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        search(text, _workers, setWorkers, filter.toLowerCase());
    }, [text, setText, _workers, filter]);

    useEffect(() => {
        setWorkers(_workers)
        if (_workers?.length === 0) {
            setLoading(true);
            fetchWorkers();
        }
        return () => {
            fetchWorkers()
        }
    }, []);

    const fetchWorkers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/register/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
                },
            });
            let workers = await response.json();
            workers = workers.filter(data => data.is_worker)
            props.setWorkers(workers.sort((a, b) => { return b.served - a.served }));
            setLoading(false);
            return workers;
        }
        catch (err) {
            console.log(err, 'Received error');
            setLoading(false);
            setNotify(true);
            setMsg({
                title: 'Authentication',
                message: 'Invalid username or password.'
            })
        }
    };


    return (
        <div className={'isDetail ? styles.listContainerDetail : styles.listContainer'}>
            <RouteIndicator route="Dashboard" current="Workers" />
            <div className="sticky -top-4 md:top-3 z-40 pt-1">
                <Search placeholder="Search" isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} newButton={true} title={'Worker'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            </div>
            <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>{workers.length || 0} Worker{workers.length !== 1 && 's'}</h2>
            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 px-0 md:px-2 lg:px-10 mt-4 md:mt-6'}>
                {loading ? (<div style={{ margin: 'auto' }}><Activity2 /></div>) : (workers.map((worker) =>
                    <ClientCard client={worker} detail={detail} setDetail={setDetail} setIsDetail={setIsDetail} />
                ))}
            </div>
            <Notification notify={notify} setNotify={setNotify} msg={msg} />
            <AddWorker isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />
        </div>
    )
};

const mapStateToProps = ({auth, data, refresh}) => {
    return {
        username: auth.username,
        password: auth.password,
        _workers: data.workers,
        refresh: refresh.refresh,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData, setWorkers}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkerList);
