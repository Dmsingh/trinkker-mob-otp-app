import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from '../../firebase'


const PrivateRoute = ({component: Component, ...rest}) => {

if(localStorage.getItem('sessiontree')){
    
}
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            localStorage.getItem('sessiontree')  ?
          
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;