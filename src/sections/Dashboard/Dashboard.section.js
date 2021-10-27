import React, { useState, useEffect } from 'react';
import {IoPeople, IoWalk } from 'react-icons/io5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    setWorkers,
    setClients,
    setFinances,
    setCheckouts,
    setGallery,
    setProducts,
    setServices,
} from '../../redux/Actions/Data.actions';
import { MiniProgressBar, ClientCard, RouteIndicator, Activity2, Notification } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import { ClientDetail, EditClient, EditWorker, WorkerDetail } from '..';

const Dashboard = (props) => {
    const { username, password, _clients, _workers, gallery, services, products, finances, checkouts } = props;
    const [worker, setWorker] = useState(false);
    const [detail, setDetail] = useState({});
    const [editClient, setEditClient] = useState(false);
    const [editWorker, setEditWorker] = useState(false);
    const [client, setClient] = useState(false);
    const [clients, setClients] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [msg, setMsg] = useState({});
    const [notify, setNotify] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setWorkers(_workers)
        if (_workers?.length === 0) {
            setIsLoading(true);
            fetchWorkers();
        }
        return () => {
            fetchWorkers()
        }
    }, [_workers]);

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
            workers = workers?.filter(data => data.is_worker)
            props.setWorkers(workers.sort((a, b) => { return b.served - a.served }));
            setIsLoading(false);
            return workers;
        }
        catch (err) {
            console.log(err, 'Received error');
            setIsLoading(false);
            setNotify(true);
            setMsg({
                title: 'Connection Error',
                message: 'Unable to fetch workers.'
            })
        }
    };


    useEffect(() => {
        setClients(_clients)
        if (_clients?.length === 0) {
            setIsLoading(true);
            fetchClients();
        }
        return () => {
            fetchClients()
        }
    }, [_clients]);

    const fetchClients = async () => {
        try {
            const response = await fetch(`${BASE_URL}/register/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
                },
            });
            let clients = await response.json();
            clients = clients?.filter(data => data.is_client)
            props.setClients(clients.sort((a, b) => { return b.served - a.served }));
            setIsLoading(false);
            return clients;
        }
        catch (err) {
            console.log(err, 'Received error');
            setIsLoading(false);
            setNotify(true);
            setMsg({
                title: 'Connection Error',
                message: 'Unable to fetch clients.'
            })
        }
    };

    useEffect(() => {
        if (services?.length === 0) {
            fetchServices();
        }
        setServices(services);
        return () => {
            fetchServices()
        }
    }, [services]);

    const fetchServices = async () => {
        try {
            const response = await fetch(`${BASE_URL}/service/`);
            const services = await response.json();
            props.setServices(services);
            setIsLoading(false);
            return services;
        }
        catch (err) {
            console.log(err, 'Received error');
            setIsLoading(false)
            setNotify(true);
            setMsg({
                title: 'Connection Error',
                message: 'Unable to fetch services.'
            })
        }
    };

    useEffect(() => {
        if (products?.length === 0) {
            fetchProducts()
        }
        setProducts(products);
        return () => {
            fetchProducts()
        }
    }, [products]);

    useEffect(() => {
        if (gallery?.length === 0) {
            fetchGallery();
        }
        return () => {
            fetchGallery()
        }
    }, [gallery]);

    const fetchGallery = async () => {
        try {
            const response = await fetch(`${BASE_URL}/Gallery/`);
            const gallery = await response.json();
            props.setGallery(gallery);
            setIsLoading(false);
            return gallery;
        }
        catch (err) {
            console.log(err, 'Received error');
            setIsLoading(false);
            setNotify(true);
            setMsg({
                title: 'Connection Error',
                message: 'Unable to fetch gallery.'
            })
        }
    };
    
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/product/`);
            const products = await response.json();
            props.setProducts(products);
            setIsLoading(false)
            return products;
        }
        catch (err) {
            console.log(err, 'Received error');
            setIsLoading(false)
            setNotify(true);
            setMsg({
                title: 'Connection Error',
                message: 'Unable to fetch products.'
            })
        }
    };

    useEffect(() => {
        if (finances?.length === 0) {
            fetchPurchases();
        }
        return () => {
            fetchPurchases()
        }
    }, [finances]);

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
            purchases = purchases.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
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
                title: 'Connection Error',
                message: 'Unable to fetch finances.'
            })
        }
    };

    useEffect(() => {
        if (checkouts?.length === 0) {
            fetchCheckouts();
        }
        return () => {
            fetchCheckouts()
        }
    }, [checkouts]);

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
                title: 'Connection Error',
                message: 'Unable to fetch checkouts.'
            })
        }
    };
    
    return (
        <section className={'styles.dashboardSection'}>
            <RouteIndicator route="Dashboard" current="" />
            {/* <Search placeholder="Search" isSearch={isSearch} setIsSearch={setIsSearch} newButton={false} filters={filters} filter={filter} setFilter={setFilter} /> */}
            <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>Section</h2>
            <div className={'flex items-start my-1 mt-4 px-4 md:px-8 mb-10'}>
                <div className={'w-56 h-auto px-1.5 py-4 rounded-md bg-primary flex justify-center items-center flex-col mr-5 shadow'}>
                    <div className={'flex justify-start w-full items-center text-lg text-gray-300 px-2 mb-1.5'}>
                        <IoPeople className={'mr-2'} />
                        <p className={''}>Clients</p>
                    </div>
                    <p className="text-gray-400 text-base font-semibold mb-2"> {clients.length} <span className="text-xs">/{300}</span></p>
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
                    <p className="text-gray-400 text-base font-semibold mb-2"> {workers.length} <span className="text-xs">/{10}</span></p>
                    <MiniProgressBar progress={workers ? (workers.length / 10 * 100) : 0} />
                </div>
            </div>
            <div className={''}>
                <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>Top {(workers.length * 0.2).toFixed(0)} Worker{Number((workers.length * 0.2).toFixed(0)) <= 1 ? '' : 's'}</h2>
                {/* <h2 className={styles.tempo}>This month</h2> */}
            </div>
            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 px-0 md:px-2 lg:px-8 mt-4 md:mt-6 mb-10'}>
                {isLoading ? (<div className="flex justify-center col-span-2 md:col-span-3 lg:col-span-4"><Activity2 /></div>) : workers.map((worker, index) => ((index < Number((workers.length * 0.2).toFixed(0))) &&
                    <ClientCard client={worker} setDetail={setDetail} setIsDetail={setWorker} key={worker.id} />
                ))}
            </div>
            <div className={''}>
                <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>Top {(clients.length * 0.2).toFixed(0)} Client{Number((clients.length * 0.2).toFixed(0)) <= 1 ? '' : 's'}</h2>
                {/* <h2 className={styles.tempo}>This month</h2> */}
            </div>
            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 px-0 md:px-2 lg:px-8 mt-4 md:mt-6'}>
                {isLoading ? (<div className="flex justify-center col-span-2 md:col-span-3 lg:col-span-4"><Activity2 /></div>) : clients.map((client, index) => ((index < Number((clients.length * 0.2).toFixed(0))) &&
                    <ClientCard client={client} setDetail={setDetail} setIsDetail={setClient} key={client.id} />
                ))}
            </div>
            <WorkerDetail show={worker} setShow={setWorker} setEdit={setEditWorker} detail={detail} />
            <ClientDetail show={client} setShow={setClient} setEdit={setEditClient} detail={detail} />
            <EditClient edit={editClient} setEdit={setEditClient} detail={detail} />
            <EditWorker edit={editWorker} setEdit={setEditWorker} detail={detail} />
            <Notification notify={notify} setNotify={setNotify} msg={msg} />
        </section>
    )
};

const mapStateToProps = ({ auth, data }) => {
    return {
        username: auth.username,
        password: auth.password,
        _clients: data.clients,
        _workers: data.workers,
        gallery: data.gallery,
        services: data.services,
        products: data.products,
        finances: data.finances,
        checkouts: data.checkouts,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setClients,
        setWorkers,
        setFinances,
        setCheckouts,
        setGallery,
        setProducts,
        setServices
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
