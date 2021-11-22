import React, { useEffect, useState } from 'react';
import { IoClose, IoMail } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Confirmation, Progress, ReferCard } from '../../../components';
import { img_1 } from '../../../res/images';
import { Hyphenated } from '../../../utils/number';
import extractInitials from '../../../utils/extractIni';
import { deleteClient } from '../../../redux/Actions/Data.actions';
import { BASE_URL } from '../../../utils/globalVariable';

const ClientDetail = (props) => {
    const { show, setShow, setEdit, detail, clients, user, username, password } = props;

    const [confirm, setConfirm] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const stop = (e) => {
        e.stopPropagation()
    }

    const Confirm = (data) => {
        setConfirm(true);
        setData({ data, msg: 'Are you sure you want to delete: '});
    };
    const [referers, setReferers] = useState([]);


    useEffect(() => {
        let _referers = clients.filter(data => data.friend === detail.id);
        setReferers(_referers);
    }, [detail]);

    const authenticate = (id) => {
        setLoading(true);
        fetch(`${BASE_URL}/register/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            }
        })
            .then(res => {
                props.deleteClient(id);
                setConfirm(false);
            })
            .then(res => {
                setTimeout(() => {
                    setLoading(false)
                    setShow(false);
                }, 3000);
            })
            .catch(err => {
                setLoading(false)
                console.log(err);
            })
    };

    const Edit = () => {
        setEdit(true);
        setShow(!show)
    }

    return (
        <>
            <div onClick={() => setShow(false)} className={`h-full bg-gray-50 bg-opacity-10 fixed z-40 top-0 backdrop-filter backdrop-blur-sm transition-all duration-500 ease-in-out ${show ? 'left-0 w-96 opacity-100' : '-left-16 opacity-0 w-0'} `}>
                <div onClick={(e) => stop(e)} className={`fixed shadow-xl h-screen overflow-y-auto overflowY -top-0 z-30 bg-white text-gray-700 p-8 transition-all delay-100 ease-in-out ${show ? 'left-0 w-full md:w-96 opacity-100' : '-left-16 opacity-0 w-0'}`}>
                    <div className="flex justify-between items-end text-lg font-semibold">
                        <h2>Client Information</h2>
                        <button onClick={() => setShow(!show)} className="flex items-center rounded-full outline-none text-base py-1 px-2 text-gray-900 bg-white shadow-md mx-1.5 transition duration-500 ease-in-out hover:shadow-xl"><IoClose /></button>
                    </div>
                    <hr className="my-3" />
                    <div className="flex flex-col justify-center items-center md:mt-1.5 text-xl font-semibold">
                        {detail.img ? <img src={img_1} alt="User" className="h-44 w-44 rounded-full" /> :
                            <h2 className={'h-44 w-44 flex items-center justify-center rounded-full text-5xl tracking-wider shadow-md'}>{detail.fullname ? extractInitials(detail.fullname) : extractInitials(detail.username)}</h2>
                        }
                        <h4 className="text-sm mt-2">{detail.fullname} | {detail.username}</h4>
                    </div>
                    <hr className="my-3" />
                    <div className="md:mt-1.5 text-base">
                        <h2 className="text-left font-semibold">Contact Info</h2>
                        <h4 className="flex items-center text-gray-600 text-sm mt-2"><IoMail className="mr-3" /> {detail.email}</h4>
                        <h4 className="flex items-center text-gray-600 text-sm mt-1.5"><FaPhone className="mr-3" /> {detail.phone && Hyphenated(detail?.phone)}</h4>
                    </div>
                    <hr className="my-3" />
                    <div className="md:mt-1.5 text-base mb-1">
                        <h2 className="text-left font-semibold">My Bonuses</h2>
                        <div className={'text-primary flex justify-center flex-col items-center text-sm my-2'}>
                            <Progress progress={detail.my_bonus / 100 || 0} />
                            <p className="mt-2 text-center">{detail.my_bonus || 0} / 10,000 XAF</p>
                        </div>
                        <h2 className="text-left font-semibold">Refer Bonuses</h2>
                        <div className={'text-primary flex justify-center flex-col items-center text-sm my-2'}>
                            <Progress progress={detail.refer_bonus / 100 || 0} />
                            <p className="mt-2 text-center">{detail.refer_bonus || 0} / 10,000 XAF</p>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <h2 className="text-left font-semibold">Invited</h2>
                    <div className="md:mt-1.5 text-base mb-5">
                        <div className={'grid grid-cols-2 gap-4'}>
                            {referers.map((referer, index) => <ReferCard refer={referer} key={referer.id} />)}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        {user.is_superuser && <Button title="Edit" invert={false} onClick={() => Edit()} />}
                        <Button title="Close" invert={true} onClick={() => setShow(!show)} />
                        <div className="mx-2" />
                        <Button title="Delete" invert={true} type='danger' onClick={() => Confirm(detail)} />
                    </div>
                </div>
            </div>
            <Confirmation confirm={confirm} setConfirm={setConfirm} data={data} loading={loading} onClick={id => authenticate(id)} />
        </>
    )
};

const mapStateToProps = ({auth, data, points}) => {
    return {
        username: auth.username,
        password: auth.password,
        clients: data.clients,
        table: points.table,
        user: auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ deleteClient }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetail);