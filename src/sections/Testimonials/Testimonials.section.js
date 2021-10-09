import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity2, Search, Testimonial } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import { setData, setTestimonials } from '../../redux/Actions/Data.actions';
import styles from './Testimonials.module.css';
import search from '../../utils/search';

const Testimonials = (props) => {
    const { _testimonials } = props;

    const [filter, setFilter] = useState('');
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [testimonials, setTestimonials] = useState([]);
    const [filters] = useState([
        'Client Name',
    ]);

    useEffect(() => {
<<<<<<< HEAD
        setIsLoading(true);
        fetch(`${BASE_URL}/testimonial/`)
            .then(res => {
                const response = res.json();
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
=======
        search(text, _testimonials, setTestimonials, 'client_name');
    }, [text]);
>>>>>>> 0ced31eb8f3c4dec3de009d4ed042ac4280362a9

    useEffect(() => {
        setTestimonials(_testimonials)
        if (_testimonials?.length === 0) {
            setIsLoading(true);
            fetchTestimonials();
        }
        return () => {
            fetchTestimonials()
        }
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch(`${BASE_URL}/testimonial/`);
            const testimonials = await response.json();
            props.setTestimonials(testimonials);
            setIsLoading(false);
            return testimonials;
        }
        catch (err) {
            console.log(err, 'Received error');
            setIsLoading(false);
        }
    };

    return (
        <section className={`w-full min-h-full bg-white p-4 lg:p-6`}>
            <h1 className={`text-gray-800 text-left text-xl lg:text-2xl sticky top-3 z-30 pl-2 w-full py-1.5 rounded bg-white bg-opacity-30 backdrop-filter backdrop-blur-md`}>Testimonials</h1>
            <div className="sticky top-3 z-40 pt-1">
                <Search placeholder="Search" newButton={false} title={'Service'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            </div>
            <div className={styles.testimonialContainer}>
                {isLoading ? <Activity2 /> : testimonials.map((testimonial, index) => <Testimonial testimonial={testimonial} />)}
            </div>
        </section>
    )
};

const mapStateToProps = ({data}) => {
    return {
        _testimonials: data.testimonials,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData, setTestimonials}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Testimonials);