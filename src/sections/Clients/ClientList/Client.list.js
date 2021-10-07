/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
    Activity2, 
    ClientCard, 
    Notification, 
    RouteIndicator, 
    Search 
} from '../../../components';
import { BASE_URL } from '../../../utils/globalVariable';
import { AddClient } from '../..';
import search from '../../../utils/search';
import {setData, setClients} from '../../../redux/Actions/Data.actions';
import {setPoint, clearPoint} from '../../../redux/Actions/Points.actions';


const ClientList = (props) => {
    const {
        setDetail, 
        setIsDetail, 
        isDetail, 
        detail, 
        username, 
        password,
        _clients,
        refresh,
    } = props;
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({});
    const [text, setText] = useState('');
    const [notify, setNotify] = useState(false);
    const [filter, setFilter] = useState('');
    const [purchases, setPurchases] = useState([])
    const [filters] = useState([
        'Username',
        'Fullname'
    ]);
    const [clients, setClients] = useState([]);

    const fetchPurchases = async () => {
            try {
                const response = await fetch(`${BASE_URL}/purchase/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
                    },
                });
                const registered = await response.json();
                setPurchases(registered);
                return registered;
            }
            catch(err) {
                console.log(err, 'Received error');
            }
            
        }

    useEffect(() => {
        search(text, _clients, setClients, filter.toLowerCase());
    }, [text]);
    
    useEffect(() => {
        setClients(_clients)
        if (_clients?.length === 0) {
            setLoading(true);
            fetchClients();
        }
        return () => {
            fetchClients()
        }
    }, []);

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
            clients = clients.filter(data => data.is_client)
            props.setClients(clients.sort((a, b) => { return b.served - a.served }));
            setLoading(false);
            return clients;
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
            <RouteIndicator route="Dashboard" current="Clients" />
            <div className="sticky -top-4 md:top-3 z-40 pt-1">
            <Search 
                placeholder="Search" 
                isOpen={isOpenAdd} 
                setIsOpen={setIsOpenAdd} 
                newButton={true} 
                title={"Client"} 
                filters={filters} 
                filter={filter} 
                setFilter={setFilter}
                text={text}
                setText={setText} />
            </div>
            <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>{clients.length} Client{clients.length !== 1 &&'s'}</h2>
            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 px-0 md:px-2 lg:px-10 mt-4 md:mt-6'}>
                {loading ? (<div style={{margin: 'auto'}}><Activity2 /></div>) : (clients.map((client) => 
                    <ClientCard client={client} detail={detail} setDetail={setDetail} setIsDetail={setIsDetail} key={client.id} />
                ))}
            </div>
            <Notification notify={notify} setNotify={setNotify} msg={msg} />
            <AddClient isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />
        </div>
    )
}

const mapStateToProps = ({auth, data, refresh}) => {
    return {
        username: auth.username,
        password: auth.password,
        _clients: data.clients,
        refresh: refresh.refresh,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData, setClients, setPoint, clearPoint}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
