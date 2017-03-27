/**
 * Created by mgradob on 1/25/17.
 */
import React from "react";
import {Link} from "react-router";
import * as AuthUtil from "../utils/auth-util";
import {Tabs, Tab} from "material-ui/Tabs";
import FlatButton from "material-ui/FlatButton";
import AppBar from "material-ui/AppBar";

export default class MainView extends React.Component {
    urlDashboard = '/admin/home/';
    urlRequests = '/admin/home/requests';
    urlInventory = '/admin/home/inventory';
    urlNewUsers = '/admin/home/new-users';
    urlUsers = '/admin/home/users';

    //region Component
    constructor() {
        super();

        AuthUtil.monitorSession()
            .catch(err => {
                console.error('Firebase', 'Sign out', err);
                this.props.router.replace('/');
            });
    }

    render() {
        return (
            <div>
                {this.renderToolbar(this.props.location.pathname)}

                {/*{this.renderSubtoolbar(this.props.location.pathname)}*/}

                {this.renderTabs(this.props.location.pathname)}

                {this.props.children}
            </div>
        );
    }

    //endregion

    //region Logic
    renderToolbar = (location) => {
        let root = location.split('/')[1];

        console.log('ReactRouter', 'Current Location', location, 'Root', root);

        switch (root) {
            case '':
            case 'sign-in':
            case 'sign-up':
                return (
                    // TODO: Override styles
                    <AppBar
                        title='Labs CUU'
                        iconElementRight={<FlatButton label='Entrar' containerElement={<Link to='/sign-in'/>}/>}
                    />
                );
            case 'admin':
            case 'super':
                return (
                    // TODO: Override styles
                    <AppBar
                        title='Labs CUU'
                        iconElementRight={<FlatButton label='Salir' onTouchTap={this.signOut.bind(this)}/>}
                    />
                );
            default:
                return null;
        }
    };

    renderTabs = (location) => {
        let root = location.split('/')[1];

        switch (root) {
            case 'admin':
                return (
                    // TODO: Override styles
                    <Tabs>
                        <Tab data-route="/admin" label='Laboratorios' containerElement={<Link to='/admin'/>}/>
                        <Tab label='Mi Cuenta' containerElement={<Link to='/admin/account'/>}/>
                    </Tabs>

                );
            default:
                return null;
        }
    };

    signOut = () => {
        AuthUtil.signOutUser()
            .then(() => {
                console.log('Firebase', 'Sign out', 'Success');
                this.props.router.replace('/');
            })
            .catch(err => console.error('Firebase', 'Sign out', err));
    };
    //endregion
}