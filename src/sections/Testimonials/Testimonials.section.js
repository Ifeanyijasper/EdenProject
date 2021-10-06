import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity2, Search, Testimonial } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import { setData } from '../../redux/Actions/Data.actions';
import { setTestimonials } from '../../redux/Actions/Data.actions';
import styles from './Testimonials.module.css';
import search from '../../utils/search';

const Testimonials = (props) => {
    const {_testimonials} = props;

    const [filter, setFilter] = useState('');
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [testimonials, setTestimonials] = useState([]);
    const [filters] = useState([
        'Client Name',
    ]);

    useEffect(() => {
        search(text, _testimonials, setTestimonials, 'client_name');
    }, [text]);

    useEffect(() => {
        setTestimonials(_testimonials)
        return () => {
            fetchTestimonials()
        }
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch(`${BASE_URL}/testimonial/`);
            const testimonials = await response.json();
            props.setTestimonials(testimonials);
            return testimonials;
        }
        catch (err) {
            console.log(err, 'Received error');
        }
    };

    return (
        <section className={`w-full min-h-full bg-white p-4 lg:p-6`}>
            <h1 className={`text-gray-800 text-left text-xl lg:text-2xl pb-1 sticky top-3 z-40`}>Testimonials</h1>
            <div className="sticky top-3 z-40">
            <Search placeholder="Search" newButton={false} title={'Service'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            </div>
            <div className={styles.testimonialContainer}>
                {isLoading ? <Activity2 /> : testimonials.map((testimonial, index) => <Testimonial testimonial={testimonial} />)}
            </div>
        </section>
    )
}

const mapStateToProps = ({data}) => {
    return {
        _testimonials: data.testimonials,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData, setTestimonials}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Testimonials);