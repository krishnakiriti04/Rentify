import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Orders from './../containers/Orders';
import Products from './../containers/Products';
import LandingPage from './LandingPage';
import ContactPage from './../containers/ContactPage';
import Login from "./../containers/login";
import ProtectedRoute from "./../containers/ProtectedRoutes";
import Signup from "./../containers/Signup"
import AddProduct from "./AddProduct";
import MyOrders from "./../containers/MyOrders";

function Navigation() {
    return (
        <div>
        <Router>
        <div>
            <Switch>
                    <Route path="/" exact component={LandingPage}></Route>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/register" exact component={Signup}></Route>
                    <ProtectedRoute path="/home" exact component={LandingPage}></ProtectedRoute>
                    <ProtectedRoute path="/orders" exact component={Orders}></ProtectedRoute>
                    <Route path="/products" exact component={Products}></Route>
                    <ProtectedRoute path="/contact" exact  component={ContactPage}></ProtectedRoute>
                    <ProtectedRoute path="/addproduct" exact component={AddProduct}></ProtectedRoute>
                    <ProtectedRoute path="/myorders" exact component={MyOrders}></ProtectedRoute>                                        
            </Switch>
        </div>
    </Router>
        </div>
    )
}

export default Navigation
