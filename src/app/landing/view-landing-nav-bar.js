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
        return(
            <div>
                <FlatButton
                    label="Entrar"
                    primary={true}
                    containerElement={<Link to="/sign-in"/>}
                />

                <FlatButton
                    label="Registrarse"
                    secondary={true}
                    containerElement={<Link to="/sign-up"/>}
                />

                <Divider />
                <br/>
            </div>
        );
    }
    //endregion
}