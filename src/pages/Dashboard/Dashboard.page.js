import React, { useEffect, useState } from 'react';
import {Redirect, Route, Switch} from 'react-router';

import { 
    AdminGallery,
    Checkout,
    ClientSection, 
    Dashboard, 
    FinanceSection,
    ProductSection, 
    Profile, 
    ServiceSection, 
    SideNav, 
    WorkerSection 
} from '../../sections';
import {WorkArea} from '../../components';
import { connect } from 'react-redux';

const DashBoard = (props) => {
    const { username, password } = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(false);
        setTimeout(() => {
            setShow(true);
        }, 3000);
    }, []);

    return (
        <>
            {username === "" || password === '' ? <Redirect to="/login" /> : <div className={`h-screen overflow-hidden md:p-0 lg:p-4 flex flex-col md:flex-row ${show ? 'flex' : 'opacity-0'}`}>
                <SideNav />
                <WorkArea>
                    <Switch>
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/dashboard/clients" component={ClientSection} />
                        <Route path="/dashboard/workers" component={WorkerSection} />
                        <Route path="/dashboard/finances" component={FinanceSection} />
                        <Route path="/dashboard/checkout" component={Checkout} />
                        <Route path="/dashboard/products" component={ProductSection} />
                        <Route path="/dashboard/services" component={ServiceSection} />
                        <Route path="/dashboard/profile" component={Profile} />
                        <Route path="/dashboard/gallery" component={AdminGallery} />
                    </Switch>
                </WorkArea>
            </div>}
        </>
    )
};

const mapStateToProps = ({auth, data, refresh}) => {
    return {
        username: auth.username,
        password: auth.password,
    }
}

export default connect(mapStateToProps)(DashBoard);
