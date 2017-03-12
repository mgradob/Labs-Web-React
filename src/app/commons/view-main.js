/**
 * Created by mgradob on 1/25/17.
 */
import React from "react";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Link} from "react-router";

export default class MainView extends React.Component {
    urlDashboard = '/admin/home/';
    urlRequests = '/admin/home/requests';
    urlInventory = '/admin/home/inventory';
    urlNewUsers = '/admin/home/new-users';
    urlUsers = '/admin/home/users';

    //region Component
    render() {
        return (
            <div>
                {this.renderToolbar(this.props.location.pathname)}

                {this.renderSubtoolbar(this.props.location.pathname)}

                {this.props.children}
            </div>
        );
    }
    //endregion

    //region Logic
    renderToolbar = (location) => {
        console.log('ReactRouter', 'Current Location', location);

        switch (location) {
            case '/':
            case '/sign-in':
            case '/sign-up':
                return (
                    // TODO: Override styles
                    <Toolbar>
                        <ToolbarGroup firstChild={true}>
                            <FlatButton label='Labs CUU' containerElement={<Link to='/'/>}/>
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <FlatButton label='Entrar' containerElement={<Link to='/sign-in'/>}/>
                            <RaisedButton label='Registrarse' containerElement={<Link to='/sign-up'/>}/>
                        </ToolbarGroup>
                    </Toolbar>
                );
            case '/admin':
            case '/admin/account':
                return (
                    // TODO: Override styles
                    <Toolbar>
                        <ToolbarGroup firstChild={true}>
                            <FlatButton label='Labs CUU' containerElement={<Link to='/admin'/>}/>
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <FlatButton label='Salir' containerElement={<Link to='/'/>}/>
                        </ToolbarGroup>
                    </Toolbar>

                );
            default: return null;
        }
    };

    renderSubtoolbar = (location) => {
        switch (location) {
            case '/admin':
            case '/admin/account':
                return (
                    // TODO: Override styles
                    <Toolbar>
                        <ToolbarGroup firstChild={true}>
                            <FlatButton label='Laboratorios' containerElement={<Link to='/admin'/>}/>
                            <FlatButton label='Mi Cuenta' containerElement={<Link to='/admin/account'/>}/>
                        </ToolbarGroup>
                    </Toolbar>

                );
            default: return null;
        }
    };
    //endregion
}