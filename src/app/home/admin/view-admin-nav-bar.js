/**
 * Created by mgradob on 1/31/17.
 */
import React from 'react';
import {Link} from 'react-router';

import FlatButton from "material-ui/FlatButton";
import Divider from 'material-ui/Divider';

export default class LandingNavBarView extends React.Component {
    //region Component
    render() {
        let urlDashboard = '/admin/home/';
        let urlRequests = '/admin/home/requests';
        let urlInventory = '/admin/home/inventory';
        let urlNewUsers = '/admin/home/new-users';
        let urlUsers = '/admin/home/users';

        return (
            <div>
                <FlatButton
                    label="Dashboard"
                    primary={true}
                    containerElement={<Link to={urlDashboard}/>}
                />

                <FlatButton
                    label="Pedidos"
                    primary={true}
                    containerElement={<Link to={urlRequests}/>}
                />

                <FlatButton
                    label="Inventario"
                    primary={true}
                    containerElement={<Link to={urlInventory}/>}
                />

                <FlatButton
                    label="Nuevos Usuarios"
                    primary={true}
                    containerElement={<Link to={urlNewUsers}/>}
                />

                <FlatButton
                    label="Usuarios"
                    primary={true}
                    containerElement={<Link to={urlUsers}/>}
                />

                <Divider />
                <br/>
            </div>
        );
    }

    //endregion
}