import React, { useState } from 'react';
import { IoBarChart, IoCash, IoClose } from 'react-icons/io5';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Confirmation} from '../../components';
import extractInitials from '../../utils/extractIni';
import { BASE_URL } from '../../utils/globalVariable';
import { IMG_URL } from '../../utils/imageVariable';
import { deleteProduct } from '../../redux/Actions/Data.actions';

const GalleryDetail = (props) => {
    const { show, setShow, setEdit, detail } = props;

    const [confirm, setConfirm] = useState(false);
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);

    const stop = (e) => {
        e.stopPropagation()
    }

    const Confirm = (data) => {
        setConfirm(true);
        setData({ data, msg: 'Are you sure you want to delete: '});
    };

    const authenticate = (id) => {
        setLoading(true);
        fetch(`${BASE_URL}/product/${id}/`, {
            method: 'DELETE'
        })
            .then(res => {
                setConfirm(false)
                setLoading(false);
                props.deleteProduct(id);
            })
            .then(res => {
                setTimeout(() => {
                    setShow(false);
                }, 3000);
            })
            .catch(err => {
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
                        <h2>Gallery Information</h2>
                        <button onClick={() => setShow(!show)} className="flex items-center rounded-full outline-none text-base py-1 px-2 text-gray-900 bg-white shadow-md mx-1.5 transition duration-500 ease-in-out hover:shadow-xl"><IoClose /></button>
                    </div>
                    <hr className="my-3" />
                    <div className="flex flex-col justify-center items-center md:mt-1.5 text-xl font-semibold">
                        {detail.img ? <img src={`${detail.img}`} alt="User" className="h-44 w-44 rounded-full" /> :
                            <h2 className={'h-44 w-44 flex items-center justify-center rounded-full text-5xl tracking-wider shadow-md'}>{detail.fullname ? extractInitials(detail.fullname) : extractInitials(detail.username)}</h2>
                        }
                        <h4 className="text-sm mt-2">{detail.name}</h4>
                    </div>
                    <hr className="my-3" />
                    <div className="md:mt-1.5 text-base">
                        <h2 className="text-left font-semibold">Info</h2>
                        <h4 className="flex items-center text-gray-600 text-sm mt-2">Event: {detail.event}</h4>
                        <h4 className="flex items-center text-gray-600 text-sm mt-1.5">Name: {detail.name}</h4>
                    </div>
                    <hr className="my-3" />
                    {/* <div className="md:mt-1.5 text-base mb-1">
                        <h2 className="text-left font-semibold">About</h2>
                        <p className={'styles.list'}>{detail.description}</p>
                    </div> */}
                    {/* <hr className="my-3" /> */}
                    <div className="flex justify-end">
                        <Button title={"Edit"} onClick={() => Edit()} />
                        <div className="mx-2" />
                        <Button title="Close" invert={true} onClick={() => setShow(!show)} />
                        <div className="mx-2" />
                        <Button title={"Delete"} invert={true}  type="danger" onClick={() => Confirm(detail)} />
                    </div>
                </div>
            </div>
            <Confirmation confirm={confirm} setConfirm={setConfirm} data={data} loading={loading} onClick={id => authenticate(id)} />
        </>
    )
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ deleteProduct }, dispatch);
}

export default connect(null, mapDispatchToProps)(GalleryDetail);