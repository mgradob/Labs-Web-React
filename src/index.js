import "./index.css";
import React from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import * as firebase from 'firebase';

import MainView from "./app/commons/view-main";
import ErrorView from './app/commons/view-error';
import LandingView from './app/landing/view-landing';
import SignInView from './app/landing/sign-in/view-sign-in';
import SignUpView from './app/landing/sign-up/view-sign-up';

import AdminView from './app/home/admin/view-admin-view';
import AdminLabsView from './app/home/admin/labs/view-admin-labs-list';
import AdminHomeView from './app/home/admin/home/view-admin-home';
import AdminDashboardView from './app/home/admin/home/dashboard/view-admin-dashboard';
import AdminInventoryView from './app/home/admin/home/inventory/view-admin-inventory';
import AdminInventoryAddCategoryView from './app/home/admin/home/inventory/view-admin-add-category';
import AdminInventoryDetailView from './app/home/admin/home/inventory/view-admin-inventory-detail';
import EditItemView from './app/home/admin/home/inventory/view-admin-edit-item';

injectTapEventPlugin();

var config = {
    apiKey: "AIzaSyA2GH0ELrhw_8wI6QqCXSzS7S-0Wy6MtnE",
    authDomain: "labs-d3e30.firebaseapp.com",
    databaseURL: "https://labs-d3e30.firebaseio.com",
    storageBucket: "labs-d3e30.appspot.com",
    messagingSenderId: "431852162818"
};
firebase.initializeApp(config);

render((
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path='/' component={MainView}>
                <IndexRoute component={LandingView}/>
                <Route path='sign-in' component={SignInView}/>
                <Route path='sign-up' component={SignUpView}/>
            </Route>
            <Route path='admin' component={AdminView}>
                <IndexRoute component={AdminLabsView}/>
                <Route path='home' component={AdminHomeView}>
                    <IndexRoute component={AdminDashboardView}/>
                    {/*<Route path='requests' component/>*/}

                    <Route path='inventory' component={AdminInventoryView}/>
                    <Route path='inventory/add' component={AdminInventoryAddCategoryView}/>
                    <Route path='inventory/:category_id' component={AdminInventoryDetailView}/>
                    {/*<Route path='inventory/:category_id/add' component={}/>*/}
                    {/*<Route path='inventory/:category_id/edit/:item_id' component={EditItemView}/>*/}
                </Route>
            </Route>
            <Route path='*' component={ErrorView}/>
        </Router>
    </MuiThemeProvider>
), document.getElementById('root'));