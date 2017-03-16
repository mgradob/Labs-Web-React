/**
 * Created by mgradob on 1/25/17.
 */
import React from "react";
import {Link} from "react-router";
import {Tabs, Tab} from "material-ui/Tabs";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

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
            case 'admin':
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
    //endregion
}