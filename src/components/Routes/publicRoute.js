import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import firebase from '../../firebase'
const PublicRoute = ({component: Component, restricted, ...rest}) => {
    
    
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            localStorage.getItem('sessiontree') ?
                <Redirect to="/homepage" />
            : 
           
            <Component {...props} />

            
        )} />
    );
};

export default PublicRoute;