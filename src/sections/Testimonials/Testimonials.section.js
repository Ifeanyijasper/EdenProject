import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity2, Search, Testimonial } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import {setData} from '../../redux/Actions/Data.actions';
import styles from './Testimonials.module.css';
import search from '../../utils/search';

const Testimonials = (props) => {
    const {data} = props;

    const [filter, setFilter] = useState('');
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [testimonials, setTestimonials] = useState([]);
    const [filters] = useState([
        'Client Name',
    ]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}/testimonial/`)
            .then(res => {
                const response = res.json().reverse();
                return response;
            })
            .then(res => {
                setTestimonials(res);
                setIsLoading(false);
                props.setData(res);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(true);
            })
    }, []);

    useEffect(() => {
        search(text, data, setTestimonials, 'client_name');
    }, [text])

    return (
        <section className={`w-full min-h-full bg-white p-4 lg:p-6`}>
            <h1 className={`text-gray-800 text-left text-xl lg:text-2xl pb-1`}>Testimonials</h1>
            <Search placeholder="Search" newButton={false} title={'Service'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            <div className={styles.testimonialContainer}>
                {isLoading ? <Activity2 /> : testimonials.map((testimonial, index) => <Testimonial testimonial={testimonial} />)}
            </div>
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