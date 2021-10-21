import React, { useEffect, useState } from 'react'
import { IoAddCircleOutline, IoBody, IoBriefcase, IoClose, IoHandLeft, IoLeaf } from 'react-icons/io5';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity, Button, Notification } from '../../../components';
import { BASE_URL } from '../../../utils/globalVariable';
import { addFinance } from '../../../redux/Actions/Data.actions';
import { setClearPurchase } from '../../../redux/Actions/Purchase.actions';
import { setPoint } from '../../../redux/Actions/Points.actions';
import { Product, Service } from '../..';

const AddPurchase = (props) => {
    const { add, setAdd, username, password, user, product, total, _services, _products } = props;

    const [options, setOptions] = useState([]);
    const [client, setClient] = useState('');
    const [list, setList] = useState([]);
    const [purchase, setPurchase] = useState('Products');
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const stop = (e) => {
        e.stopPropagation()
    }

    const fetchMyBonus = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/register/${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
                },
            });
            const registered = await response.json();
            const myBonus = registered.my_bonus;
            const served = registered.served;
            const refer_bonus = registered.refer_bonus;
            return [myBonus, served, refer_bonus];
        }
        catch (err) {
            console.log(err, 'Received error');
        }
            
    }

    const updateMyBonus = (id, myBonus) => {
        const body = {
            my_bonus: myBonus,
        }
        fetch(`${BASE_URL}/register/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            },
            body: JSON.stringify(body),
        })
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                // console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const updateReferBonus = (id, Bonus) => {
        const body = {
            refer_bonus: Bonus,
        }
        fetch(`${BASE_URL}/register/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            },
            body: JSON.stringify(body),
        })
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                // console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const updateServed = (id, served) => {
        const body = {
            served
        }
        fetch(`${BASE_URL}/register/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            },
            body: JSON.stringify(body),
        })
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                // console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        let _referals = [];
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
                if (res.length > 1) {
                    let _res = res.filter((data) => data.is_client || data.is_worker);
                    setList(_res);
                    if (_res.length > 0) {
                        _res.map((re, index) => (
                            _referals.push({ value: re.id, label: re.username })
                        ));
                    }
                    setOptions([..._referals]);
                }
            })
            .catch(err => {
                console.log(err);
            })

    }, [add]);

    const exit = () => {
        setAdd(false);
        props.setClearPurchase();
    }

    const purchased = () => {
        setIsLoading(true);
        let friend;
        const body = {
            client: client.label,
            client_id: client.value,
            worker_id: user.id,
            worker: username,
            item: product,
            total: total,
            point: total / 1000,
        }

        friend = list.filter(data => data.id === client.value);

        fetch(`${BASE_URL}/purchase/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            },
            body: JSON.stringify(body),
        })
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                setIsLoading(false);
                props.setClearPurchase();
                props.addFinance(res)
                props.setPoint(client.value, total / 2000, friend[0].friend);
                setNotify(true);
                setMsg({
                    title: 'Successful Purchase',
                    message: 'Purchase completed, you served one more person.'
                })
                if (friend[0].served === null && friend[0].friend !== null) {
                    let friendId = friend[0].friend;
                    let data = fetchMyBonus(friendId);
                    data
                        .then(res => {
                            let myBonus = Number(res[2]) + (total * 0.15);
                            updateReferBonus(friendId, myBonus);
                        })
                        .then(res => {
                            let data = fetchMyBonus(client.value);
                            data
                                .then(res => {
                                    let served = Number(res[1]) + 1;
                                    updateServed(client.value, served);
                                })
                                .then(res => {
                                    let data = fetchMyBonus(user.id);
                                    data
                                        .then(res => {
                                            let served = Number(res[1]) + 1;
                                            updateServed(user.id, served);
                                        })
                                })
                        })
                } else {
                    let friendId = friend[0].friend;
                    let data = fetchMyBonus(friendId);
                    data
                        .then(res => {
                            let myBonus = Number(res[2]) + (total * 0.025);
                            updateReferBonus(friendId, myBonus);
                        })
                        .then(res => {
                            let data = fetchMyBonus(client.value);
                            data
                                .then(res => {
                                    let myBonus = Number(res[0]) + (total * 0.05);
                                    let served = Number(res[1]) + 1;
                                    updateMyBonus(client.value, myBonus);
                                    updateServed(client.value, served);
                                })
                                .then(res => {
                                    let data = fetchMyBonus(user.id);
                                    data
                                        .then(res => {
                                            let served = Number(res[1]) + 1;
                                            updateServed(user.id, served);
                                        })
                                })
                        })
                }
                return res;
            })
            .then(res => {
                setTimeout(() => {
                    setAdd(false);
                }, 3000);
            })
            .catch(err => {
                setIsLoading(false);
                setNotify(true);
                setMsg({
                    title: 'Unexpected Error',
                    message: 'An error occured, check you internet connection'
                })
            })
    };

    return (
        <>
            <div onClick={() => setAdd(false)} className={`h-full bg-gray-50 bg-opacity-10 fixed z-50 top-0 backdrop-filter backdrop-blur-sm transition-all duration-500 ease-in-out ${add ? 'right-0 w-full opacity-100' : '-right-16 opacity-0 w-0'} `}>
                <div onClick={(e) => stop(e)} className={`fixed shadow-xl h-screen overflow-y-auto overflowY -top-0 z-30 bg-white text-gray-700 p-5 transition-all delay-100 ease-in-out ${add ? 'right-0 w-full opacity-100' : '-right-16 opacity-0 w-0'}`}>
                    <div className="flex justify-between items-center md:mt-2 text-xl font-semibold text-green-700 bg-white bg-opacity-30 backdrop-filter backdrop-blur-md sticky -top-4 md:top-0 z-40 pt-1">
                        <h2 className="text-sm md:text-base lg:text-xl">New Purchase</h2>
                        <Select
                            options={options}
                            styles={customStyles}
                            className={'ml-auto mr-4 md:mr-7 w-44 md:w-52 lg:w-60 text-xs md:text-sm p-0 mb-2 border-b-2 border-gray-700 cursor-pointer'}
                            onChange={(value) => setClient(value)}
                        />
                        <button onClick={() => exit()} className="flex items-center rounded-full outline-none text-base py-1 px-2 text-gray-900 bg-white shadow-md mx-1.5 transition duration-500 ease-in-out hover:shadow-xl"><IoClose /></button>
                    </div>
                    <hr className="my-5" />
                    <nav className={''}>
                        <ul className={'flex justify-start items-center'}>
                            <li className={'cursor-pointer'} onClick={() => setPurchase('Products')}><i className={['text-sm my-0.5 mr-3 p-1 px-2 flex items-center text-green-700 bg-white border-b-2 border-white', purchase === 'Products' && 'border-green-700'].join(' ')}><IoLeaf className="mr-1.5" /> Products</i></li>
                            <li className={'cursor-pointer'} onClick={() => setPurchase('Services')}><i className={['text-sm my-0.5 ml-3 p-1 px-2 flex items-center text-green-700 bg-white border-b-2 border-white', purchase === 'Services' && 'border-green-700'].join(' ')}><IoHandLeft className="mr-1.5" /> Services</i></li>
                        </ul>
                        <hr className={'my-4 mx-2'} />
                    </nav>
                    <div className="mb-10">
                        {purchase === "Products" ? (
                            <Product onClick={() => purchased()} loading={isLoading} />
                        ) : (
                            <div>
                                    <Service onClick={() => purchased()} loading={isLoading} />
                            </div>
                        )}
                        <div className="w-full">
                            <div className="fixed bottom-9 right-9 justify-center md:justify-end mt-20">
                                {/* {isLoading ? <Activity /> : <Button title="Add Product" invert={false} onClick={() => authenticate()} />} */}
                                <div className="mx-2" />
                                <Button title="Close" onClick={() => exit()} />
                            </div>
                        </div>
                    </div>
                </div>
                <Notification notify={notify} setNotify={setNotify} msg={msg} />
            </div>
        </>
    )
};

const mapStateToProps = ({ auth, purchase, data }) => {
    return {
        username: auth.username,
        password: auth.password,
        user: auth.user,
        product: purchase.product,
        _products: data.products,
        _services: data.services,
        total: purchase.total,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addFinance, setClearPurchase, setPoint }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPurchase);

const customStyles = {
    option: (styles, { isFocused }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? "#010f24" : null,
            color: isFocused ? "white" : '#999',
        };
    },
    control: (base, { isFocused }) => ({
        ...base,
        backgroundColor: 'transparent',
        // This line disable the blue border
        boxShadow: 'none',
        border: 'none',
        padding: '0px',
        margin: '0px',
        '&:hover': {
            border: 'none',
        }
    })
};
