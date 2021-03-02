import React from 'react';
import {Route, Switch} from 'react-router';

import styles from './Dashboard.module.css';
import { 
    ClientSection, 
    Dashboard, 
    FinanceSection, 
    ProductSection, 
    ServiceSection, 
    SideNav, 
    WorkerSection 
} from '../../sections';
import {WorkArea} from '../../components';

const DashBoard = () => {
    return (
        <div className={styles.dashboard}>
            <SideNav />
            <WorkArea>
                <Switch>
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/dashboard/clients" component={ClientSection} />
                    <Route path="/dashboard/workers" component={WorkerSection} />
                    <Route path="/dashboard/finances" component={FinanceSection} />
                    <Route path="/dashboard/products" component={ProductSection} />
                    <Route path="/dashboard/services" component={ServiceSection} />
                </Switch>
            </WorkArea>
        </div>
    )
}

export default DashBoard;
