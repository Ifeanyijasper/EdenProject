import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddService from './AddService.section';
import { 
    Activity2, 
    ItemCard, 
    RouteIndicator, 
    Search 
} from '../../../components';
import { BASE_URL } from '../../../utils/globalVariable';
import styles from './ServiceList.module.css';
import search from '../../../utils/search';
import {setData} from '../../../redux/Actions/Data.actions';
import ServiceDetail from './ServiceDetail.section';
import EditService from './EditService.setion';

const ServiceList = (props) => {
    const {
        _services,
    } = props;

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [filter, setFilter] = useState('');
    const [edit, setEdit] = useState(false);
    const [services, setServices] = useState([]);
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [filters] = useState([
        'Name',
        'Price',
        'Discount'
    ])

    const showDetails = (service) => {
        setShow(true);
        setDetail(service);
    }

    useEffect(() => {
        search(text, _services, setServices, filter.toLowerCase());
    }, [text]);


    useEffect(() => {
        setServices(_services)
        if (_services?.length === 0) {
            setIsLoading(true);
            fetchServices();
        }
        return () => {
            fetchServices()
        }
    }, [_services]);

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
        }
    };

    return (
        <div className={''}>
            <RouteIndicator route="Dashboard" current="Services" />
            <div className="sticky -top-4 md:top-3 z-40 pt-1">
                <Search placeholder="Search" isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} newButton={true} title={'Service'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            </div>
            {text.length <= 0 && <>
                <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>Top 6 Services</h2>
                <hr className={styles.horizontalLine} />
                <div className={`py-10 lg:px-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 flex justify-center`}>
                    {isLoading ? (<Activity2 />) : services.map((service, index) => ((Math.floor(Number(service.discount)) < 10 && index < 6) &&
                        <ItemCard item={service} onClick={() => showDetails(service)} key={service.id} />
                    ))}
                </div>
            </>
            }
            <hr className={styles.horizontalLine} />
            <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>{services.length || 0} Services</h2>
            <hr className={styles.horizontalLine} />
            <div className={`py-10 lg:px-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 flex justify-center`}>
                {isLoading ? (<Activity2 />) : services.map((service, index) => <ItemCard item={service} onClick={() => showDetails(service)} />)}
            </div>
            <AddService add={isOpenAdd} setAdd={setIsOpenAdd} />
            <EditService edit={edit} setEdit={setEdit} detail={detail} />
            <ServiceDetail show={show} setShow={setShow} setEdit={setEdit} detail={detail} />
        </div>
    )
};

const mapStateToProps = ({data, refresh}) => {
    return {
        _services: data.services,
        refresh: refresh.refresh,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);