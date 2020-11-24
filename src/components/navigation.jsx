import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Orders from './../containers/Orders';
import Products from './../containers/Products';
import LandingPage from './LandingPage';
import ContactPage from './../containers/ContactPage';

function Navigation() {
    return (
        <div>
        <Router>
        <div>
            <Switch>
                    <Route path="/" exact component={LandingPage}></Route>
                    <Route path="/orders" exact component={Orders}></Route>
                    <Route path="/products" exact component={Products}></Route>
                    <Route path="/contact" exact  component={ContactPage}></Route>                    
            </Switch>
        </div>
    </Router>
        </div>
    )
}

export default Navigation
