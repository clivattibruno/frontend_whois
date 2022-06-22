import React from 'react';
import { Switch, Route } from "react-router-dom";

import Dashboard from '../pages/Dashboard/index';

export default function RoutesAdm() {
    return(
        <Switch>
            <Route exact path='/' component={Dashboard}/>
        </Switch>
    );
}