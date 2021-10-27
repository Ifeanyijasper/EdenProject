import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
    Activity2, 
    ItemCard, 
    Search 
} from '../../../components';
import { BASE_URL } from '../../../utils/globalVariable';
import search from '../../../utils/search';
import { setServices } from '../../../redux/Actions/Data.actions';
import {setData} from '../../../redux/Actions/Data.actions';

const ServiceList = (props) => {
    const {
        isDetail,
        setIsDetail,
        setDetail,
        _services
    } = props;

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [text, setText] = useState('');
    const [filters] = useState([
        'Name',
        'Price',
        'Discount',
        'Likes'
    ])
    const [filter, setFilter] = useState(filters[0]);

    const showDetails = (service) => {
        setIsDetail(true);
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
        <div className={`w-full min-h-full`}>
            <h1 className={`text-gray-800 text-left text-xl lg:text-2xl sticky top-3 z-30 pl-2 w-full py-1.5 rounded bg-white bg-opacity-30 backdrop-filter backdrop-blur-md`}>Services</h1>
            <div className="sticky top-3 z-40 pt-1">
                <Search placeholder="Search" isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} newButton={false} title={'Service'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            </div>
            {text.length <= 0 && <>
                <h2 className={`text-gray-600 text-left md:text-center text-lg md:text-xl lg:text-xl pb-1 font-semibold`}>Top 6 Services</h2>
                <hr className={`w-4/5 mx-auto`} />
                <div className={`py-6 mb-6 lg:px-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 flex justify-center flex justify-center`}>
                    {isLoading ? <div className="flex justify-center col-span-2 md:col-span-3"><Activity2 /></div> : services.map((service, index) => ((Math.floor(Number(service.discount)) < 10 && index < 6) &&
                        <ItemCard item={service} onClick={() => showDetails(service)} key={service.id} />
                    ))}
                </div>
            </>
            }
            <hr className={`w-4/5 mx-auto mt-2`} />
            <h2 className={`py-4 text-gray-600 text-left md:text-center text-lg md:text-xl lg:text-xl pb-1 font-semibold`}>{services.length} Service{services.length !== 1 && 's'}</h2>
            <hr className={`w-4/5 mx-auto mb-2`} />
            <div className={`py-6 lg:px-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 flex justify-center`}>
                {isLoading ? <div className="flex justify-center col-span-2 md:col-span-3"><Activity2 /></div> : services.map((service, index) => <ItemCard item={service} onClick={() => showDetails(service)} />)}
            </div>
        </div>
    )
};


const mapStateToProps = ({data}) => {
    return {
        _services: data.services
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData, setServices}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);