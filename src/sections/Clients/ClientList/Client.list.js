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
import styles from './ClientList.module.css';
import { AddClient } from '../..';
import search from '../../../utils/search';
import {setData} from '../../../redux/Actions/Data.actions';
import {setPoint, clearPoint} from '../../../redux/Actions/Points.actions';


const ClientList = (props) => {
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
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({});
    const [text, setText] = useState('');
    const [notify, setNotify] = useState(false);
    const [filter, setFilter] = useState('');
    const [purchases, setPurchases] = useState([])
    const [filters] = useState([
        'Username',
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
        setLoading(true);
                props.clearPoint();
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
                setClients(_clients);
                props.setData(_clients);
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
        search(text, data, setClients, filter.toLowerCase());
    }, [text]);


    return (
        <div className={isDetail ? styles.listContainerDetail : styles.listContainer}>
            <RouteIndicator route="Dashboard" current="Clients" />
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
            <h2 className={styles.headerTitle}>{clients.length} Client{clients.length !== 1 &&'s'}</h2>
            <div className={styles.cardsContainer}>
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
        data: data.data,
        refresh: refresh.refresh,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData, setPoint, clearPoint}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
