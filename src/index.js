import "./index.css";
import React from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

import LandingView from "./app/landing/view-landing";
import SignUpView from "./app/landing/sign-up/view-sign-up";
import SignInView from "./app/landing/sign-in/view-sign-in";

injectTapEventPlugin();

render((
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Route path='/'>
                <IndexRoute  component={LandingView}/>
                <Route path="signup" component={SignUpView}/>
                <Route path='signin' component={SignInView}/>
            </Route>
        </Router>
    </MuiThemeProvider>
), document.getElementById('root'));