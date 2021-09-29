import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Search, ItemCard } from '../../components';
import styles from './Service.module.css';
import search from '../../utils/search';
import {setData} from '../../redux/Actions/Data.actions';
import { BASE_URL } from '../../utils/globalVariable';

const Service = (props) => {
    const {data} = props;
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
        fetch(`${BASE_URL}/service/`)
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                setServices(res);
                props.setData(res);
            })
            .catch(err => {
                // setIsLoading()
                console.log(true);
            })
    }, []);

    useEffect(() => {
        search(text, data, setServices, filter.toLocaleLowerCase());
    }, [text])

    return (
        <div className={styles.listContainer}>
            <Search placeholder="Search" newButton={false} title={'Service'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            <hr className={styles.horizontalLine} />
                <h2 className={styles.productTitle}>{services.length || 0} Service{services.length !== 1 && 's'}</h2>
            <hr className={styles.horizontalLine} />
            <div className={styles.productContainer}>
                {services.map((service, index) => <ItemCard item={service} add={true} onClick={() => active()} key={service.id} />)}
            </div>
        </div>
    )
}

const mapStateToProps = ({data}) => {
    return {
        data: data.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Service);
