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
import styles from './ServiceList.module.css';
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
        <div className={isDetail ? styles.listContainerDetail : styles.listContainer}>
            <h1 className={styles.Title}>Services</h1>
            <Search placeholder="Search" isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} newButton={false} title={'Service'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            { text.length <= 0 &&   <>
                    <h2 className={styles.serviceTitle}>Top 6 Services</h2>
                    <hr className={styles.horizontalLine} />
                    <div className={styles.serviceContainer}>
                        {isLoading ? (<Activity2 />) : services.map((service, index) => ((Math.floor(Number(service.discount)) < 10 && index < 7)&&
                        <ItemCard item={service} onClick={() => showDetails(service)} key={service.id} />
                        ))}
                    </div>
                </>
            }
            <hr className={styles.horizontalLine} />
            <h2 className={styles.serviceTitle}>{services.length} Service{services.length !== 1 && 's'}</h2>
            <hr className={styles.horizontalLine} />
            <div className={styles.serviceContainer}>
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