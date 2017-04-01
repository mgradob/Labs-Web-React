import "./index.css";
import React from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import * as firebase from "firebase";
import MainView from "./app/commons/view-main";
import ErrorView from "./app/commons/view-error";
import LandingView from "./app/landing/view-landing";
import SignInView from "./app/landing/view-sign-in";
import SignUpView from "./app/landing/view-sign-up";
import SuperAdminView from "./app/super-admin/view-super-admin-dashboard";
import AdminContainerView from "./app/home/admin/view-admin-container";
import AdminLabsView from "./app/home/admin/view-admin-labs";
import AdminAccountView from "./app/home/admin/view-admin-account";
import LabInfoView from "./app/home/admin/lab/view-admin-lab-info";
import CategoryDetailView from "./app/home/admin/lab/inventory/view-admin-category-detail";
import NewUserDetailView from "./app/home/admin/lab/new-users/view-new-user-detail";
import UserDetailView from "./app/home/admin/lab/users/view-user-detail";

injectTapEventPlugin();

const config = {
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
                <Route path='admin' component={AdminContainerView}>
                    <IndexRoute component={AdminLabsView}/>
                    <Route path='account' component={AdminAccountView}/>
                    <Route path=':lab_id' component={LabInfoView}/>
                    <Route path=':lab_id/category/:category_id' component={CategoryDetailView}/>
                    <Route path=':lab_id/new-user/:new_user_uid' component={NewUserDetailView}/>
                    <Route path=':lab_id/user/:user_uid' component={UserDetailView}/>
                </Route>
                <Route path='super' component={SuperAdminView}/>
            </Route>
            <Route path='*' component={ErrorView}/>
        </Router>
    </MuiThemeProvider>
), document.getElementById('root'));