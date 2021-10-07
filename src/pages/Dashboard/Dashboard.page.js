import React, { useEffect, useState } from 'react';
import {Route, Switch} from 'react-router';

import styles from './Dashboard.module.css';
import { 
    Checkout,
    ClientSection, 
    Dashboard, 
    FinanceSection, 
    Nav, 
    ProductSection, 
    Profile, 
    ServiceSection, 
    SideNav, 
    WorkerSection 
} from '../../sections';
import {WorkArea} from '../../components';

const DashBoard = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(false);
        setTimeout(() => {
            setShow(true);
        }, 3000);
    }, []);

    return (
        <div className={`h-screen overflow-hidden md:p-0 lg:p-4 flex flex-col md:flex-row ${show ? 'flex' : 'opacity-0'}`}>
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
                </Switch>
            </WorkArea>
        </div>
    )
}

export default DashBoard;
