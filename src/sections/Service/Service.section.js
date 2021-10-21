import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Search, ItemCard } from '../../components';
import styles from './Service.module.css';
import search from '../../utils/search';
import { setServices } from '../../redux/Actions/Data.actions';
import { BASE_URL } from '../../utils/globalVariable';

const Service = (props) => {
    const { _services, onClick, loading } = props;
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState()
    const [text, setText] = useState('');
    const [services, setServices] = useState([]);
    const [filters] = useState([
        'Name',
        'Price',
        'Discount',
        'Likes',
    ])
    const active = () => {
        return 1;
    }

    useEffect(() => {
        if (_services?.length === 0) {
            setIsLoading(true);
            fetchServices();
        }
        setServices(_services);
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

    useEffect(() => {
        search(text, _services, setServices, filter.toLocaleLowerCase());
    }, [text, _services, filter])

    return (
        <div className={'w-full'}>
            <div className="flex justify-between items-center bg-white bg-opacity-30 backdrop-filter backdrop-blur-md sticky -top-4 md:top-14 z-30">
                <h2 className={'text-gray-800 text-left text-xl lg:text-2xl'}>{services.length || 0} Service{services.length !== 1 && 's'}</h2>
                {loading && <i className="text-base px-2 py-0.5 rounded animate-pulse bg-green-200 text-green-700 ">Purchasing ...</i>}
                <Search
                    placeholder="Search"
                    purchase={true}
                    title={'Purchase'}
                    filters={filters}
                    filter={filter}
                    setFilter={setFilter}
                    text={text}
                    setText={setText}
                    onClick={() => onClick()}
                />
            </div>
            <hr className={'my-4 mx-2'} />
            <div className={'py-10 grid grid-cols-4 gap-7'}>
                {/* <h1>kskjdklf</h1> */}
                {services.map((service, index) => <ItemCard item={service} add={true} onClick={() => active()} key={index} />)}
            </div>
        </div>
    )
};

const mapStateToProps = ({data}) => {
    return {
        _services: data.services,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setServices }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Service);
