import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Search, ItemCard } from '../../components';
import styles from './Service.module.css';
import search from '../../utils/search';
import {setData} from '../../redux/Actions/Data.actions';
import { BASE_URL } from '../../utils/globalVariable';

const Service = (props) => {
    const { _services } = props;
    const [filter, setFilter] = useState('');
    const [text, setText] = useState('');
    const [services, setServices] = useState([]);
    const [filters] = useState([
        'Price',
        'Discount',
        'Name',
        'Likes',
    ])
    const active = () => {
        return 1;
    }

    useEffect(() => {
        setServices(_services)
    }, []);

    useEffect(() => {
        search(text, _services, setServices, filter.toLocaleLowerCase());
    }, [text])

    return (
        <div className={'w-full'}>
            <div className="flex justify-between items-end">
                <h2 className={`text-gray-800 bg-white text-center text-xl lg:text-2xl pt-7 pb-1`}>{services.length || 0} Service{services.length !== 1 && 's'}</h2>
                <Search placeholder="Search" newButton={false} title={'Service'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            </div>
            <hr className={'my-4 mx-2'} />
            <div className={styles.productContainer}>
                {services.map((service, index) => <ItemCard item={service} add={true} onClick={() => active()} key={service.id} />)}
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
    return bindActionCreators({setData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Service);
