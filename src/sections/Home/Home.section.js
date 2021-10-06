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
    const {welcome, products, services, testimonials} = props;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!welcome) {
            setTimeout(() => {
                props.setWelcome();
            }, 3000);
        }
    }, []);

    const active = () => {
        return 1;
    }

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}/product/`)
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                props.setProducts(res);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            });
    }, [])

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}/testimonial/`)
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                props.setTestimonials(res)
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            })
    }, [])

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}/service/`)
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                props.setServices(res);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            })
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}/gallery/`)
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                props.setGallery(res);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            })
    }, []);

    return (
        <div className={styles.home}>
            <div className={styles.homeHeader}>
                <div className={styles.welcomeContainer}>
                    <h1 className={styles.welcomeTitle}>Welcome to </h1>
                    <h1 className={styles.welcomeTitle}>Eden-Beauty Complex</h1>
                    <h2 className={styles.welcomeSubTitle}>Place of great service and customer care</h2>
                    <p className={styles.welcomeText}>
                        At Eden-Beauty Complex we offer only the best of services and products because we 
                        know that trust is only built with consistency in the satisfaction of clients.
                        We are here because of your trust.
                    </p>
                    <NavLink to='/services' className={styles.explore}>Explore <IoArrowForward /></NavLink>
                </div>
                <div className={styles.imageContainer}>
                    <img src={service} alt="Something" className={styles.image} />
                </div>
            </div>
            <h1 className={`text-gray-800 bg-white text-center text-xl lg:text-2xl pt-7 pb-1`} id="services">Services</h1>
            <h3 className={`bg-white text-gray-500 text-xs lg:text-sm font-semibold text-center pb-6`}>At Company we offer the best of</h3>
            <div className={'flex bg-cover bg-fixed bg-center py-10 px-4 lg:px-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 justify-center'} style={{backgroundImage: "linear-gradient(to right, #92fe9d79, #00c8ff50), url(" + eden + ")"}}>
                {isLoading ? (<Activity2 />) : services.map((service, index) => ((Math.floor(Number(service.discount)) < 10 && index < 6)&&
                <ItemCard item={service} onClick={() => active()} key={service.id} />
                ))}
            </div>
            <h1 className={styles.title} id="services">Testimonials</h1>
            <h3 className={styles.subTitle}>What our Clients are saying...</h3>
            <div className={styles.testiCardCon}>
                <div className={styles.testiCard}>
                    {isLoading ? (<Activity2 />) : testimonials.map((testimony, index) => <TestimonialCard testimony={testimony} />)}
                </div>
                <Button title="READ MORE" onClick={() => props.history.push({pathname: '/testimonials'})} />
            </div>
            <h1 className={`text-gray-800 bg-white text-center text-xl lg:text-2xl pt-7 pb-1`} id="products">Products</h1>
            <h3 className={`bg-white text-gray-500 text-xs lg:text-sm font-semibold text-center pb-6`}>At Company we offer the best of</h3>
            <div className={'flex bg-cover bg-fixed bg-center py-10 px-4 lg:px-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 justify-center'} style={{backgroundImage: "linear-gradient(to right, #00c8ff50, #92fe9d79), url(" + beauty + ")"}}>
                {isLoading ? (<Activity2 />) : products.map((product, index) => ((Math.floor(Number(product.discount)) < 10 && index < 6)&&
                <ItemCard item={product} onClick={() => active()} key={product.id} />))}
            </div>
            <Modal 
                isOpen={!welcome}
                className={styles.splash}
                overlayClassName={styles.splash}
                closeTimeoutMS={400}
            >
                <div className={styles.Welcome}>
                    <img className={styles.Logo} src={logo} alt="Logo" />
                    <h1 className={styles.Company}>Eden-Beauty Complex</h1>
                    <h2 className={styles.Slogan}>With great need comes great service</h2>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({setWelcome, setProducts, setServices, setGallery, setTestimonials}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSection);