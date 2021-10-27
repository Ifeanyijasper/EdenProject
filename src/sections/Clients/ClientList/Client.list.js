/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
    Activity2, 
    ClientCard, 
    Notification, 
    RouteIndicator, 
    Search, 
    SqrButton
} from '../../../components';
import { BASE_URL } from '../../../utils/globalVariable';
import AddClient from './AddClient.section';
import ClientDetail from './ClientDetail.section';
import search from '../../../utils/search';
import {setData, setClients} from '../../../redux/Actions/Data.actions';
import {setPoint, clearPoint} from '../../../redux/Actions/Points.actions';
import EditClient from './EditClient.section';


const ClientList = (props) => {
    const {
        _clients,
        username,
        password,
    } = props;
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({});
    const [text, setText] = useState('');
    const [load, setLoad] = useState(16);
    const [notify, setNotify] = useState(false);
    const [filter, setFilter] = useState('');
    const [detail, setDetail] = useState({});
    const [filters] = useState([
        'Username',
        'Fullname'
    ]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        search(text, _clients, setClients, filter.toLowerCase());
    }, [text, _clients, filter]);

    useEffect(() => {
        setClients(_clients)
        if (_clients?.length === 0) {
            setLoading(true);
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
            setLoading(false);
            return clients;
        }
        catch (err) {
            console.log(err, 'Received error');
            setLoading(false);
            setNotify(true);
            setMsg({
                title: 'Connection Error',
                message: 'Unable to fetch clients.'
            })
        }
    };



    return (
        <div className={'w-full mid-h-full'}>
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
            <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>{clients.length} Client{clients.length !== 1 && 's'}</h2>
            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-7 px-0 md:px-2 lg:px-8 mt-4 md:mt-6'}>
                {loading ? (<div className="flex justify-center col-span-2 md:col-span-3 lg:col-span-4"><Activity2 /></div>) : (clients.map((client, index) =>
                    index < load && <ClientCard client={client} setDetail={setDetail} setIsDetail={setShow} key={client.id} />
                ))}
            </div>
            <div className="text-center my-8">
                <SqrButton title="Load More" invert={true} onClick={() => setLoad(load + 16)} />
            </div>
            <Notification notify={notify} setNotify={setNotify} msg={msg} />
            <AddClient add={isOpenAdd} setAdd={setIsOpenAdd} />
            <EditClient edit={edit} setEdit={setEdit} detail={detail} />
            <ClientDetail show={show} setShow={setShow} setEdit={setEdit} detail={detail} />
        </div>
    )
};

const mapStateToProps = ({auth, data, refresh}) => {
    return {
        _clients: data.clients,
        refresh: refresh.refresh,
        username: auth.username,
        password: auth.password,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData, setClients, setPoint, clearPoint}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
