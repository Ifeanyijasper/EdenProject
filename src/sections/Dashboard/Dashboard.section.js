import React, { useState, useEffect } from 'react';
import {IoPeople, IoWalk } from 'react-icons/io5';
import { connect } from 'react-redux';
import { MiniProgressBar, AdminCard, ClientCard, RouteIndicator, Activity2 } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';

import styles from './DashboardSection.module.css';

const Dashboard = (props) => {
    const {username, password} = props;
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
                console.log(response);
                const res = response.json();
                return res;
            })
            .then(res => {
                console.log(res);
                let _clients = res.filter(data => data.is_client);
                let _workers = res.filter(data => data.is_worker);
                setStats({
                    client: _clients.length,
                    worker: _workers.length,
                });
                setWorkers(_workers);
                setClients(_clients);
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
    
    return (
        <section className={styles.dashboardSection}>
            <RouteIndicator route="Dashboard" current="" />
            {/* <Search placeholder="Search" isSearch={isSearch} setIsSearch={setIsSearch} newButton={false} filters={filters} filter={filter} setFilter={setFilter} /> */}
            <h2 className={styles.adminsText}>Sections</h2>
            <div className={styles.cardsContainer}>
                <div className={styles.sectionCard}>
                    <div className={styles.sectionInfo}>
                        <IoPeople className={styles.icon} />
                        <p className={styles.sectionText}>Clients: {stats.client}</p>
                    </div>
                    <p>Goal: {50}</p>
                    <MiniProgressBar progress={stats.client/50 * 100} />
                </div>

                {/* <div className={styles.sectionCard}>
                    <div className={styles.sectionInfo}>
                        <IoWallet className={styles.icon} />
                        <p className={styles.sectionText}>Finances: {stats[1].current}</p>
                    </div>
                    <p>Goal: {stats[1].goal}</p>
                    <MiniProgressBar progress={100/stats[1].goal * 100} />
                </div> */}

                <div className={styles.sectionCard}>
                    <div className={styles.sectionInfo}>
                        <IoWalk className={styles.icon} />
                        <p className={styles.sectionText}>Workers: {stats.worker}</p>
                    </div>
                    <p>Goal: {10}</p>
                    <MiniProgressBar progress={stats.worker/30 * 100} />
                </div>
            </div>
            <div className={styles.sectionTitle}>
                <h2 className={styles.adminsText}>Top 8 Workers</h2>
                <h2 className={styles.tempo}>This month</h2>
            </div>
            <div className={styles.cardsContainer}>
                {isLoading ? (<Activity2 />) : workers.map((worker, index) => (
                    <AdminCard worker={worker} key={index} />
                ))}
            </div>
            <div className={styles.sectionTitle}>
                <h2 className={styles.adminsText}>Top 8 Clients</h2>
                <h2 className={styles.tempo}>This month</h2>
            </div>
            <div className={styles.cardsContainer}>
                {isLoading ? (<Activity2 />) : clients.map((client, index) => 
                    <ClientCard client={client} key={index} />
                )}
            </div>
        </section>
    )
}

const mapStateToProps = ({auth}) => {
  return {
    username: auth.username,
    password: auth.password,
  }
}

export default connect(mapStateToProps)(Dashboard);

