import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { Gallery, HomeSection, Login, Nav, Products, Services, Testimonials } from '../../sections';


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
        <div className={'show ? styles.home : styles.nothing'}>
            {
                (location.pathname === '/' || 
                location.pathname ==='/login' || 
                location.pathname ==='/services' || 
                location.pathname ==='/testimonials' || 
                location.pathname ==='/products') && 
                (<Nav />)
            }
            <Switch>
                <Route path="/" exact component={HomeSection} />
                <Route path="/services" component={Services} />
                <Route path="/products" component={Products} />
                <Route path="/testimonials" component={Testimonials} />
                <Route path="/login"  component={Login} />
            </Switch>
        </div>
    )
}

export default Home;
