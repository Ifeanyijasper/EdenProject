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
        <div className={`h-screen overflow-hidden md:p-0 lg:p-4 flex flex-col md:flex-row ${show ? 'flex' : 'opacity-0'}`}>
            {
                (location.pathname === '/' || 
                location.pathname ==='/login' || 
                location.pathname ==='/services' || 
                location.pathname ==='/testimonials' || 
                location.pathname ==='/gallery' || 
                location.pathname ==='/products') && 
                (<Nav />)
            }
            <div className={`sm:h-full md:h-full w-full lg:rounded-r-xl overflow-x-hidden overflowY`}>
                <Switch>
                    <Route path="/" exact component={HomeSection} />
                    <Route path="/services" component={Services} />
                    <Route path="/products" component={Products} />
                    <Route path="/gallery" component={Gallery} />
                    <Route path="/testimonials" component={Testimonials} />
                    <Route path="/login"  component={Login} />
                </Switch>
            </div>
        </div>
    )
}

export default Home;
