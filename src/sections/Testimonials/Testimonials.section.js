import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity2, Search, Testimonial } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import { setData, setTestimonials } from '../../redux/Actions/Data.actions';
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
        search(text, _testimonials, setTestimonials, 'client_name');
    }, [text, _testimonials]);

    useEffect(() => {
        setTestimonials(_testimonials)
        if (_testimonials?.length === 0) {
            setIsLoading(true);
            fetchTestimonials();
        }
        return () => {
            fetchTestimonials()
        }
    }, [_testimonials]);

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
            <div className={'w-full grid grid-cols-1 md:grid-cols-2 gap-7'}>
                {isLoading ? <div className="flex justify-center my-30 col-span-1 md:col-span-2 md:row-span-5"><Activity2 /></div> : testimonials.map((testimonial, index) => <Testimonial testimonial={testimonial} key={index} />)}
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