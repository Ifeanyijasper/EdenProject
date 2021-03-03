import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AddService } from '../..';
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

const ServiceList = (props) => {
    const {
        isDetail, 
        setIsDetail, 
        setDetail,
        data,
        refresh,
    } = props;

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [filter, setFilter] = useState('');
    const [services, setServices] = useState([]);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filters] = useState([
        'Name',
        'Price',
        'Discount'
    ])

    const showDetails = (service) => {
        setIsDetail(true);
        setDetail(service);
    }

    useEffect(() => {
        search(text, data, setServices, filter.toLowerCase());
    }, [text])

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
    }, [isOpenAdd, refresh]);

    return (
        <div className={isDetail ? styles.listContainerDetail : styles.listContainer}>
            <RouteIndicator route="Dashboard" current="Services" />
            <Search placeholder="Search" isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} newButton={true} title={'Service'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
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
            <h2 className={styles.serviceTitle}>{services.length || 0} Services</h2>
            <hr className={styles.horizontalLine} />
            <div className={styles.serviceContainer}>
                {isLoading ? (<Activity2 />) :services.map((service, index) => <ItemCard item={service} onClick={() => showDetails(service)} />)}
            </div>
            <AddService isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />
        </div>
    )
}

const mapStateToProps = ({data, refresh}) => {
    return {
        data: data.data,
        refresh: refresh.refresh,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);