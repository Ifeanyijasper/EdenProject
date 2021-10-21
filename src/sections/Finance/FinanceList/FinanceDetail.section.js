import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { connect } from 'react-redux';

import { Button, Confirmation } from '../../../components';
import { img_1 } from '../../../res/images';
import extractInitials from '../../../utils/extractIni';
import { BASE_URL } from '../../../utils/globalVariable';
import { Thousand } from '../../../utils/number';

const FinanceDetail = (props) => {
    const { show, setShow, detail, clients, username, password, user } = props;
    const stop = (e) => {
        e.stopPropagation()
    }
    const [referers, setReferers] = useState([]);
    const [confirm, setConfirm] = useState(false);
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);

    const Confirm = (data) => {
        setConfirm(true);
        setData({ data, msg: 'Are you sure you want to delete: '});
    };

    const authenticate = (id) => {
        setLoading(true);
        fetch(`${BASE_URL}/purchase/${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            }
        })
            .then(res => {
                setConfirm(false);
                setLoading(false);
                setShow(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        let _referers = clients.filter(data => data.friend === detail?.id);
        setReferers(_referers);
    }, [detail]);

    return (
        <>
            <div onClick={() => setShow(false)} className={`h-full bg-gray-50 bg-opacity-10 fixed z-40 top-0 backdrop-filter backdrop-blur-sm transition-all duration-500 ease-in-out ${show ? 'left-0 w-96 opacity-100' : '-left-16 opacity-0 w-0'} `}>
                <div onClick={(e) => stop(e)} className={`fixed shadow-xl h-screen overflow-y-auto overflowY -top-0 z-30 bg-white text-gray-700 p-8 transition-all delay-100 ease-in-out ${show ? 'left-0 w-full md:w-96 opacity-100' : '-left-16 opacity-0 w-0'}`}>
                    <div className="flex justify-between items-end text-lg font-semibold">
                        <h2>Purchase Information</h2>
                        <button onClick={() => setShow(!show)} className="flex items-center rounded-full outline-none text-base py-1 px-2 text-gray-900 bg-white shadow-md mx-1.5 transition duration-500 ease-in-out hover:shadow-xl"><IoClose /></button>
                    </div>
                    <hr className="my-3" />
                    <div className="flex flex-col justify-center items-center md:mt-1.5 text-xl font-semibold">
                        {detail?.clientImage ? <img src={img_1} alt="User" className="h-44 w-44 rounded-full" /> :
                            <div className="relative flex items-end">
                                <h2 className={'h-44 w-44 flex items-center justify-center rounded-full text-5xl tracking-wider shadow-md'}>{detail?.client ? extractInitials(detail?.client) : extractInitials(detail?.username)}</h2>
                                <h2 className={'h-14 w-14 absolute bg-white right-1 flex items-center justify-center rounded-full text-3xl tracking-wider shadow-md'}>{detail?.worker ? extractInitials(detail?.worker) : extractInitials(detail?.username)}</h2>
                            </div>
                        }
                        <h4 className="text-sm mt-2">{detail?.client} | {detail?.worker}</h4>
                    </div>
                    <hr className="my-3" />
                    <div className="md:mt-1.5 text-base mb-1">
                        <h2 className="text-left font-semibold">Items</h2>
                        {detail.item !== null && detail.item !== undefined && detail.item.map((item, index) => (
                            <>
                                <b className={'mr-3 font-normal'}>({item.count}) {item.name} : {Thousand(item.price * item.count)} XAF</b>
                                <br />
                            </>
                        ))}
                        {detail && detail.total && <h2 className={'mr-3 text-sm font-bold text-primary text-right mt-7'}>Total = {Thousand(detail?.total)} XAF</h2>}
                    </div>
                    <div className="flex justify-end mt-5">
                        <Button title="Close" invert={false} onClick={() => setShow(!show)} />
                        <div className="mx-2" />
                        {user.is_superuser && <Button title="Delete" invert={true} type="danger" onClick={() => Confirm(detail)} />}
                    </div>
                </div>
            </div>
            <Confirmation confirm={confirm} setConfirm={setConfirm} data={data} loading={loading} onClick={id => authenticate(id)} />
        </>
    )
};

const mapStateToProps = ({auth, data, points}) => {
    return {
        user: auth.user,
        username: auth.username,
        password: auth.password,
        clients: data.clients,
        table: points.table,
    }
}

export default connect(mapStateToProps)(FinanceDetail);