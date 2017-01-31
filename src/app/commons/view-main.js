/**
 * Created by mgradob on 1/25/17.
 */
import React from 'react';

import NavStore from './store-nav';

import * as NavActions from '../commons/actions-nav';

import Constants from '../constants';

import ErrorView from './view-error';
import LandingView from '../landing/view-landing';
import SignInView from '../sign-in/view-sign-in';
import SignUpView from '../sign-up/view-sign-up';

import AdminLabsView from '../home/admin/view-admin-labs-list';
import AdminHomeDashboardView from '../home/admin/view-admin-home-dashboard';
import AdminInventoryView from '../home/admin/view-admin-inventory';

import FlatButton from "material-ui/FlatButton";
import Divider from 'material-ui/Divider';

export default class MainView extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            appState: Constants.APP_STATE.VIEWS.LANDING,
            extras: null
        }
    }

    componentDidMount() {
        NavStore.on(Constants.APP_STATE.NAV_STATE, this._goToView);
    }

    componentWillUnmount() {
        NavStore.removeListener(Constants.APP_STATE.NAV_STATE, this._goToView);
    }

    render() {
        return (
            <div className="container">
                <h1 className="headline">Labs CUU</h1>

                {this._getActions()}

                <Divider />
                <br/>

                {this._getView()}
            </div>
        );
    }
    //endregion

    //region Logic
    _goToView = (view) => {
        console.log('MainView', 'Go to view', view);

        this.setState({
            appState: view.view,
            extras: view.extras
        });
    };

    /**
     *  All views are going to be rendered from here.
     */
    _getView = () => {
        switch (this.state.appState) {
            case Constants.APP_STATE.VIEWS.LANDING: return <LandingView/>;
            case Constants.APP_STATE.VIEWS.SIGN_IN: return <SignInView/>;
            case Constants.APP_STATE.VIEWS.SIGN_UP: return <SignUpView/>;
            case Constants.APP_STATE.VIEWS.ADMIN_LABS: return <AdminLabsView/>;
            case Constants.APP_STATE.VIEWS.ADMIN_HOME_DASHBOARD: return <AdminHomeDashboardView/>;
            case Constants.APP_STATE.VIEWS.ADMIN_HOME_INVENTORY: return <AdminInventoryView/>;
            default: return <ErrorView/>;
        }
    };

    /**
     *  You can configure actions on the top bar per view here.
     */
    _getActions = () => {
        switch (this.state.appState) {
            case Constants.APP_STATE.VIEWS.LANDING:
            case Constants.APP_STATE.VIEWS.SIGN_IN:
            case Constants.APP_STATE.VIEWS.SIGN_UP:
                return (
                    <div>
                        <FlatButton
                            label="Entrar"
                            primary={true}
                            onTouchTap={this._goToSignIn.bind(this)}
                        />

                        <FlatButton
                            label="Registrarse"
                            primary={true}
                            onTouchTap={this._goToSignUp.bind(this)}
                        />
                    </div>
                );
            case Constants.APP_STATE.VIEWS.ADMIN_HOME_DASHBOARD:
            case Constants.APP_STATE.VIEWS.ADMIN_HOME_REQUESTS:
            case Constants.APP_STATE.VIEWS.ADMIN_HOME_INVENTORY:
            case Constants.APP_STATE.VIEWS.ADMIN_HOME_NEW_USERS:
            case Constants.APP_STATE.VIEWS.ADMIN_HOME_USERS:
                return (
                    <div>
                        <FlatButton
                            label="Inicio"
                            primary={true}
                            onTouchTap={this._goToDashboard.bind(this)}
                        />
                        <FlatButton
                            label="Pedidos"
                            primary={true}
                            onTouchTap={this._goToRequests.bind(this)}
                        />
                        <FlatButton
                            label="Inventario"
                            primary={true}
                            onTouchTap={this._goToInventory.bind(this)}
                        />
                        <FlatButton
                            label="Nuevos Usuarios"
                            primary={true}
                            onTouchTap={this._goToNewUsers.bind(this)}
                        />
                        <FlatButton
                            label="Usuarios"
                            primary={true}
                            onTouchTap={this._goToUsers.bind(this)}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    _goToSignIn = () => NavActions.goToView(Constants.APP_STATE.VIEWS.SIGN_IN);
    _goToSignUp = () => NavActions.goToView(Constants.APP_STATE.VIEWS.SIGN_UP);

    _goToDashboard = () => NavActions.goToView(Constants.APP_STATE.VIEWS.ADMIN_HOME_DASHBOARD);
    _goToRequests = () => NavActions.goToView(Constants.APP_STATE.VIEWS.ADMIN_HOME_REQUESTS);
    _goToInventory = () => NavActions.goToView(Constants.APP_STATE.VIEWS.ADMIN_HOME_INVENTORY);
    _goToNewUsers = () => NavActions.goToView(Constants.APP_STATE.VIEWS.ADMIN_HOME_NEW_USERS);
    _goToUsers = () => NavActions.goToView(Constants.APP_STATE.VIEWS.ADMIN_HOME_USERS);
    //endregion
}