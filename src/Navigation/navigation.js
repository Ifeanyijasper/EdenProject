import React from 'react';
import { Route, Switch } from 'react-router';

import { Dashboard, Client, Home } from '../pages';

const Navigation = () => {
    return (
        <>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/client" component={Client} />
                <Route path="/" component={Home} />
            </Switch>
        </>
    )
};

export default Navigation;
