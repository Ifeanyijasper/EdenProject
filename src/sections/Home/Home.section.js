import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity2, Button, ItemCard, TestimonialCard } from '../../components';
import { beauty, eden, logo, service } from '../../res/images';
import { setWelcome } from '../../redux/Actions/Welcome.actions';
import { setProducts, setServices, setGallery, setTestimonials } from '../../redux/Actions/Data.actions';
import styles from './Home.module.css';
import { NavLink } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';
import { BASE_URL } from '../../utils/globalVariable';

const HomeSection = (props) => {
    const {welcome, products, services, testimonials, gallery} = props;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!welcome) {
            setTimeout(() => {
                props.setWelcome();
            }, 3600);
        }
    }, []);

    const active = () => {
        return 1;
    }

    useEffect(() => {
        if (services?.length === 0) {
            setIsLoading(true);
            fetchServices();
        }
        setServices(services);
        return () => {
            fetchServices()
        }
    }, [services]);

    const fetchServices = async () => {
        try {
            const response = await fetch(`${BASE_URL}/service/`);
            const services = await response.json();
            props.setServices(services);
            setIsLoading(false);
            return services;
        }
        catch (err) {
            console.log(err, 'Received error');
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if (products?.length === 0) {
            setIsLoading(true);
            fetchProducts()
        }
        setProducts(products);
        return () => {
            fetchProducts()
        }
    }, [products]);
    
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/product/`);
            const products = await response.json();
            props.setProducts(products);
            setIsLoading(false)
            return products;
        }
        catch (err) {
            console.log(err, 'Received error');
            setIsLoading(false)
        }
    };

    useEffect(() => {
        setTestimonials(testimonials)
        if (testimonials?.length === 0) {
            setIsLoading(true);
            fetchTestimonials();
        }
        return () => {
            fetchTestimonials()
        }
    }, [testimonials]);

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

    useEffect(() => {
        setGallery(gallery)
        if (gallery?.length === 0) {
            setIsLoading(true);
            fetchGallery();
        }
        return () => {
            fetchGallery()
        }
    }, [gallery]);

    const fetchGallery = async () => {
        try {
            const response = await fetch(`${BASE_URL}/Gallery/`);
            const gallery = await response.json();
            props.setGallery(gallery);
            setIsLoading(false);
            return gallery;
        }
        catch (err) {
            console.log(err, 'Received error');
            setIsLoading(false);
        }
    };

    return (
        <div className={`flex flex-col ${styles.home}`}>
            <div className={`py-14 px-7 flex flex-col md:flex-row justify-between items-center ${styles.homeHeader}`}>
                <div className={`w-full md:w-3/5 lg:w-1/2 md:pr-24 flex flex-col items-center md:items-start`}>
                    <h1 className={`text-2xl lg:text-4xl text-left text-gray-50`}>Welcome to </h1>
                    <h1 className={`text-2xl lg:text-4xl text-left text-gray-50`}>Eden-Beauty Complex</h1>
                    <h2 className={`text-xs lg:text-sm my-2 text-gray-400`}>Place of great service and customer care</h2>
                    <p className={'text-center md:text-left text-sm lg:text-base text-gray-50 leading-7'}>
                        At Eden-Beauty Complex we offer only the best of services and products because we 
                        know that trust is only built with consistency in the satisfaction of clients.
                        We are here because of your trust.
                    </p>
                    <NavLink to='/gallery' className={'my-7 flex items-center text-xs lg:text-sm w-20 border-b-2 p-1'}>Explore <IoArrowForward className="ml-2 animate-pulse" /></NavLink>
                </div>
                <div className={'w-2/5 lg:w-1/2'}>
                    <img src={service} alt="Something" className={`md:w-64 lg:h-96 min-w-full bg-cover bg-center`} />
                </div>
            </div>
            <h1 className={`text-gray-800 bg-white text-center text-xl lg:text-2xl pt-7 pb-1`} id="services">Services</h1>
            <h3 className={`bg-white text-gray-500 text-xs lg:text-sm font-semibold text-center pb-6`}>At Company we offer the best of</h3>
            <div className={'flex bg-cover bg-fixed bg-center py-10 px-2 lg:px-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 justify-center'} style={{backgroundImage: "linear-gradient(to right, #92fe9d79, #00c8ff50), url(" + eden + ")"}}>
                {isLoading ? (<div className="flex justify-center col-span-2 md:col-span-3"><Activity2 /></div>) : services.map((service, index) => ((Math.floor(Number(service.discount)) < 10 && index < 6)&&
                <ItemCard item={service} onClick={() => active()} key={service.id} />
                ))}
            </div>
            <h1 className={`text-gray-800 bg-white text-center text-xl lg:text-2xl pt-7 pb-1`} id="services">Testimonials</h1>
            <h3 className={`bg-white text-gray-500 text-xs lg:text-sm font-semibold text-center pb-6`}>What our Clients are saying...</h3>
            <div className={'bg-gray-300 flex flex-col py-6 px-4 flex-wrap justify-evenly items-center mt-4'}>
                <div className={`w-full flex justify-center items-center grid grid-cols-1 lg:grid-cols-2 gap-5 px-2 md:px-5 mb-5`}>
                    {isLoading ? (<div className="flex justify-center col-span-1 lg:col-span-2"><Activity2 /></div>) : testimonials.map((testimony, index) => <TestimonialCard testimony={testimony} key={index} />)}
                </div>
                <Button title="READ MORE" onClick={() => props.history.push({pathname: '/testimonials'})} />
            </div>
            <h1 className={`text-gray-800 bg-white text-center text-xl lg:text-2xl pt-7 pb-1`} id="products">Products</h1>
            <h3 className={`bg-white text-gray-500 text-xs lg:text-sm font-semibold text-center pb-6`}>At Company we offer the best of</h3>
            <div className={'flex bg-cover bg-fixed bg-center py-10 px-4 lg:px-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 justify-center'} style={{backgroundImage: "linear-gradient(to right, #00c8ff50, #92fe9d79), url(" + beauty + ")"}}>
                {isLoading ? (<div className="flex justify-center col-span-2 md:col-span-3"><Activity2 /></div>) : products.map((product, index) => ((Math.floor(Number(product.discount)) < 10 && index < 6)&&
                <ItemCard item={product} onClick={() => active()} key={product.id} />))}
            </div>
            <Modal 
                isOpen={!welcome}
                className={styles.splash}
                overlayClassName={styles.splash}
                closeTimeoutMS={500}
            >
                <div className={`w-full ${styles.Welcome}`}>
                    <img className={`w-28 md:w-36 lg:w-44 bg-center bg-cover mx-auto ${styles.Logo}`} src={logo} alt="Logo" />
                    <h1 className={`text-lg md:text-2xl lg:text-4xl ${styles.Company}`}>Eden-Beauty Complex</h1>
                    <h2 className={`text-xs md:text-sm lg:text-lg text-gray-300 leading-9 ${styles.Slogan}`}>With great need comes great service</h2>
                </div>
                
            </Modal>
        </div>
    )
}

const mapStateToProps = ({welcome, data}) => {
    return {
        welcome: welcome.entered,
        products: data.products,
        services: data.services,
        testimonials: data.testimonials,
        gallery: data.gallery,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({setWelcome, setProducts, setServices, setGallery, setTestimonials}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSection);