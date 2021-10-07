import React, { useState, useEffect } from 'react';
import {IoPeople, IoWalk } from 'react-icons/io5';
import { connect } from 'react-redux';
import { MiniProgressBar, ClientCard, RouteIndicator, Activity2 } from '../../components';

import { BASE_URL } from '../../utils/globalVariable';

const Dashboard = (props) => {
    const { username, password } = props;
    const [isSearch, setIsSearch] = useState(true);
    const [users, setUsers] = useState([]);
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
                console.log(_clients)
                setWorkers(_workers.sort((a,b) => { return b.served - a.served}));
                setClients(_clients.sort((a,b) => { return b.served - a.served}));
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
    }, []);

    const nothing = () => {
        return 1;
    }
    
    return (
        <section className={'styles.dashboardSection'}>
            <RouteIndicator route="Dashboard" current="" />
            {/* <Search placeholder="Search" isSearch={isSearch} setIsSearch={setIsSearch} newButton={false} filters={filters} filter={filter} setFilter={setFilter} /> */}
            <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>Section</h2>
            <div className={'flex items-start my-1 mt-4'}>
                <div className={'w-56 h-auto px-1.5 py-4 rounded-md bg-primary flex justify-center items-center flex-col mr-3 ml-1.5'}>
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

                <div className={'w-56 h-auto px-1.5 py-4 rounded-md bg-primary flex justify-center items-center flex-col mx-1'}>
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
            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 px-0 md:px-2 lg:px-10 mt-4 md:mt-6'}>
                {isLoading ? (<Activity2 />) : workers.map((worker, index) => ((index < Number((workers.length * 0.2).toFixed(0))) &&
                    <ClientCard client={worker} key={index} />
                ))}
            </div>
            <div className={''}>
                <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>Top {(clients.length * 0.2).toFixed(0)} Client{Number((clients.length * 0.2).toFixed(0)) <= 1 ? '' : 's'}</h2>
                {/* <h2 className={styles.tempo}>This month</h2> */}
            </div>
            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 px-0 md:px-2 lg:px-10 mt-4 md:mt-6'}>
                {isLoading ? (<Activity2 />) : clients.map((client, index) => ((index < Number((clients.length * 0.2).toFixed(0))) &&
                    <ClientCard client={client} key={index} setDetail={() => nothing()} setIsDetail={() => nothing()} />
                ))}
            </div>
        </section>
    )
};

const mapStateToProps = ({auth}) => {
  return {
    username: auth.username,
    password: auth.password,
  }
}

export default connect(mapStateToProps)(Dashboard);
