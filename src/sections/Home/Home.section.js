import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity2, Button, ItemCard, TestimonialCard } from '../../components';
import { beauty, eden, logo, img_1, img_2, img_3, img_4, img_5, img_6, service } from '../../res/images';
import {setWelcome} from '../../redux/Actions/Welcome.actions';
import styles from './Home.module.css';
import { NavLink } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';
import { BASE_URL } from '../../utils/globalVariable';

const HomeSection = (props) => {
    const {welcome} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);

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
                setProducts(res);
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
                setServices(res);
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
            <h1 className={styles.title} id="services">Services</h1>
            <h3 className={styles.subTitle}>At Company we offer the best of</h3>
            <div className={styles.container} style={{backgroundImage: "linear-gradient(to right, #92fe9d79, #00c8ff50), url(" + eden + ")"}}>
                {isLoading ? (<Activity2 />) : services.map((service, index) => ((Math.floor(Number(service.discount)) < 10 && index < 6)&&
                <ItemCard item={service} onClick={() => active()} key={service.id} />
                ))}
            </div>
            <div className={styles.testiCardCon}>
                <div className={styles.testiCard}>
                    {testimonies.map((testimony, index) => <TestimonialCard testimony={testimony} />)}
                </div>
                <Button title="READ MORE" />
            </div>
            <h1 className={styles.title} id="products">Products</h1>
            <h3 className={styles.subTitle}>At Company we offer the best of</h3>
            <div className={styles.container} style={{backgroundImage: "linear-gradient(to right, #00c8ff50, #92fe9d79), url(" + beauty + ")"}}>
                {isLoading ? (<Activity2 />) : products.map((product, index) => ((Math.floor(Number(product.discount)) < 10 && index < 6)&&
                <ItemCard item={product} onClick={() => active()} key={product.id} />))}
            </div>
            <div className={styles.testiCardCon}>
                <div className={styles.testiCard}>
                    {testimonies.map((testimony, index) => <TestimonialCard testimony={testimony} />)}
                </div>
                <Button title="READ MORE" />
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

const mapStateToProps = ({welcome}) => {
    return {
        welcome: welcome.entered,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({setWelcome}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSection);

const testimonies = [
    {id: 1, name: 'James Arthur', discount: 0, img: img_5},
    {id: 2, name: 'Jane Price', discount: 0, img: img_2},
    {id: 3, name: 'Michael Angelo', discount: 0, img: img_1},
    {id: 4, name: 'Jessica Arnold', discount: 0, img: img_3},
    {id: 5, name: 'Jume Brice', discount: 0, img: img_6},
    {id: 6, name: 'Njah Larissa', discount: 0, img: img_4},
]