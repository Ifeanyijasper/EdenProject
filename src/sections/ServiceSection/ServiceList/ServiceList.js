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
import {setData} from '../../../redux/Actions/Data.actions';

const ServiceList = (props) => {
    const {
        isDetail, 
        setIsDetail, 
        setDetail,
        data,
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
        search(text, data, setServices, filter.toLowerCase());
    }, [text]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}/service/`)
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                setServices(res);
                props.setData(res);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            })
    }, [isOpenAdd]);

    return (
        <div className={`w-full min-h-full`}>
            <h1 className={`text-gray-800 text-left text-xl lg:text-2xl pb-1`}>Services</h1>
            <Search placeholder="Search" isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} newButton={false} title={'Service'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            { text.length <= 0 &&   <>
                    <h2 className={`text-gray-600 text-left md:text-center text-lg md:text-xl lg:text-xl pb-1 font-semibold`}>Top 6 Services</h2>
                    <hr className={`w-4/5 mx-auto`} />
                    <div className={`grid grid-cols-3 gap-4`}>
                        {isLoading ? (<Activity2 />) : services.map((service, index) => ((Math.floor(Number(service.discount)) < 10 && index < 6)&&
                        <ItemCard item={service} onClick={() => showDetails(service)} key={service.id} />
                        ))}
                    </div>
                </>
            }
            <hr className={`w-4/5 mx-auto`} />
            <h2 className={`text-gray-600 text-left md:text-center text-lg md:text-xl lg:text-xl pb-1 font-semibold`}>{services.length} Service{services.length !== 1 && 's'}</h2>
            <hr className={`w-4/5 mx-auto`} />
            <div className={`grid grid-cols-3 gap-4`}>
                {isLoading ? (<Activity2 />) :services.map((service, index) => <ItemCard item={service} onClick={() => showDetails(service)} />)}
            </div>
        </div>
    )
}


const mapStateToProps = ({data}) => {
    return {
        data: data.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);