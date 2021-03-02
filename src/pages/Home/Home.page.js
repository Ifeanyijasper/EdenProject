import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { HomeSection, Login, Nav, Products, Services } from '../../sections';

import styles from './Home.module.css';


const Home = (props) => {
    const [show, setShow] = useState(false);
    const {location} = props;

    useEffect(() => {
        setShow(false);
        setTimeout(() => {
            setShow(true);
        },3000);
    },[])
    return (
        <div className={show ? styles.home : styles.nothing}>
            {
                (location.pathname === '/' || 
                location.pathname ==='/login' || 
                location.pathname ==='/services' || 
                location.pathname ==='/products') && 
                (<Nav />)
            }
            <Switch>
                <Route path="/" exact component={HomeSection} />
                <Route path="/services" component={Services} />
                <Route path="/products" component={Products} />
                <Route path="/login"  component={Login} />
            </Switch>
        </div>
    )
}

export default Home;
