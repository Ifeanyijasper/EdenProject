import React from 'react';
import { Route, Switch } from 'react-router';

import { Dashboard, Client, Home } from '../pages';

const Navigation = () => {
    return (
        <>
            <Route path="/" component={Home} />
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/client" component={Client} />
            </Switch>
        </>
    )
}

export default Navigation;
