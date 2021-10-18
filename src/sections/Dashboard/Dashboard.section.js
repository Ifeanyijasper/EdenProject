import React, { useState, useEffect } from 'react';
import {IoPeople, IoWalk } from 'react-icons/io5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setWorkers, setClients, setFinances, setCheckouts } from '../../redux/Actions/Data.actions';
import { MiniProgressBar, ClientCard, RouteIndicator, Activity2 } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import { ClientDetail, EditClient, EditWorker, WorkerDetail } from '..';

const Dashboard = (props) => {
    const { username, password, _clients, _workers } = props;
    const [worker, setWorker] = useState(false);
    const [detail, setDetail] = useState({});
    const [editClient, setEditClient] = useState(false);
    const [editWorker, setEditWorker] = useState(false);
    const [client, setClient] = useState(false);
    const [stats, setStats] = useState({
        client: 20,
        worker: 20,
    });
    const [clients, setClients] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [msg, setMsg] = useState({});
    const [notify, setNotify] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [filters] = useState([
        'Name',
        'Invited',
    ])

    useEffect(() => {
        setClients(_clients);
        setWorkers(_workers);
        return () => {

        }
    }, [])

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}/register/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            },
        })
            .then(response => {
                const res = response.json();
                return res;
            })
            .then(res => {
                let _clients = res.filter(data => data.is_client);
                let _workers = res.filter(data => data.is_worker);
                setStats({
                    client: _clients.length,
                    worker: _workers.length,
                });
                setWorkers(_workers.sort((a,b) => { return b.served - a.served}));
                setClients(_clients.sort((a, b) => { return b.served - a.served }));
                props.setWorkers(_workers.sort((a,b) => { return b.served - a.served}));
                props.setClients(_clients.sort((a,b) => { return b.served - a.served}));
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                setNotify(true);
                setMsg({
                    title: 'Authentication',
                    message: 'Invalid username or password.'
                })
            })
    }, [_clients, _workers]);

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
                let _res = res.reverse();
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
                let sortedData = data(_res);
                props.setFinances(sortedData);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
        
    }, []);

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
                props.setCheckouts(_res);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
        
    }, []);

    const nothing = () => {
        return 1;
    }
    
    return (
        <section className={'styles.dashboardSection'}>
            <RouteIndicator route="Dashboard" current="" />
            {/* <Search placeholder="Search" isSearch={isSearch} setIsSearch={setIsSearch} newButton={false} filters={filters} filter={filter} setFilter={setFilter} /> */}
            <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>Section</h2>
            <div className={'flex items-start my-1 mt-4 px-8 mb-10'}>
                <div className={'w-56 h-auto px-1.5 py-4 rounded-md bg-primary flex justify-center items-center flex-col mr-5 shadow'}>
                    <div className={'flex justify-start w-full items-center text-lg text-gray-300 px-2 mb-1.5'}>
                        <IoPeople className={'mr-2'} />
                        <p className={''}>Clients</p>
                    </div>
                    <p className="text-gray-400 text-base font-semibold mb-2"> { clients.length } <span className="text-xs">/{300}</span></p>
                    <MiniProgressBar progress={clients ? (clients.length / 300 * 100) : 0} />
                </div>

                {/* <div className={styles.sectionCard}>
                    <div className={styles.sectionInfo}>
                        <IoWallet className={styles.icon} />
                        <p className={styles.sectionText}>Finances: {stats[1].current}</p>
                    </div>
                    <p>Goal: {stats[1].goal}</p>
                    <MiniProgressBar progress={100/stats[1].goal * 100} />
                </div> */}

                <div className={'w-56 h-auto px-1.5 py-4 rounded-md bg-primary flex justify-center items-center flex-col mx-1 shadow'}>
                    <div className={'flex justify-start w-full items-center text-lg text-gray-300 px-2 mb-1.5'}>
                        <IoWalk className={'mr-2'} />
                        <p className={''}>Workers: {workers.length || 0}</p>
                    </div>
                    <p className="text-gray-400 text-base font-semibold mb-2"> { workers.length } <span className="text-xs">/{10}</span></p>
                    <MiniProgressBar progress={workers ? (workers.length / 10 * 100) : 0} />
                </div>
            </div>
            <div className={''}>
                <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>Top {(workers.length * 0.2).toFixed(0)} Worker{Number((workers.length * 0.2).toFixed(0)) <= 1 ? '' : 's'}</h2>
                {/* <h2 className={styles.tempo}>This month</h2> */}
            </div>
            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 px-0 md:px-2 lg:px-8 mt-4 md:mt-6 mb-10'}>
                {isLoading ? (<Activity2 />) : workers.map((worker, index) => ((index < Number((workers.length * 0.2).toFixed(0))) &&
                    <ClientCard client={worker} setDetail={setDetail} setIsDetail={setWorker} key={worker.id} />
                ))}
            </div>
            <div className={''}>
                <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>Top {(clients.length * 0.2).toFixed(0)} Client{Number((clients.length * 0.2).toFixed(0)) <= 1 ? '' : 's'}</h2>
                {/* <h2 className={styles.tempo}>This month</h2> */}
            </div>
            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 px-0 md:px-2 lg:px-8 mt-4 md:mt-6'}>
                {isLoading ? (<Activity2 />) : clients.map((client, index) => ((index < Number((clients.length * 0.2).toFixed(0))) &&
                    <ClientCard client={client} setDetail={setDetail} setIsDetail={setClient} key={client.id} />
                ))}
            </div>
            <WorkerDetail show={worker} setShow={setWorker} setEdit={setEditWorker} detail={detail} />
            <ClientDetail show={client} setShow={setClient} setEdit={setEditClient} detail={detail} />
            <EditClient edit={editClient} setEdit={setEditClient} detail={detail} />
            <EditWorker edit={editWorker} setEdit={setEditWorker} detail={detail} />
        </section>
    )
};

const mapStateToProps = ({ auth, data }) => {
    return {
        username: auth.username,
        password: auth.password,
        _clients: data.clients,
        _workers: data.workers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setClients, setWorkers, setFinances, setCheckouts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
