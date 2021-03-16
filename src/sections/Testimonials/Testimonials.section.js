import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Search } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import {setData} from '../../redux/Actions/Data.actions';
import styles from './Testimonials.module.css';
import search from '../../utils/search';

const Testimonials = (props) => {
    const {data} = props;

    const [filter, setFilter] = useState('');
    const [text, setText] = useState('');
    const [testimonials, setTestimonials] = useState([]);
    const [filters] = useState([
        'Client Name',
    ]);

    useEffect(() => {
        fetch(`${BASE_URL}/testimonial/`)
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                setTestimonials(res);
                props.setData(res);
            })
            .catch(err => {
                // setIsLoading()
                console.log(true);
            })
    }, []);

    useEffect(() => {
        search(text, data, setTestimonials, 'client_name');
    }, [text])

    return (
        <section className={styles.testimonial}>
            <Search placeholder="Search" newButton={false} title={'Service'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Testimonials);