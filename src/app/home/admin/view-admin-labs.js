/**
 * Created by mgradob on 1/25/17.
 */
import React from "react";
import {Link} from "react-router";
import * as AuthUtil from "../../utils/auth-util";
import {List, ListItem} from "material-ui/List";
import CircularProgress from "material-ui/CircularProgress";

export default class AdminLabsView extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            user: null
        };

        AuthUtil.getCurrentUser()
            .then((user) => this.setState({user: user}))
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <div>
                <p>Estos son los laboratorios a los que tienes acceso:</p>

                {this.state.user != null ? this.renderLabList() : <CircularProgress/>}
            </div>
        );
    }

    //endregion

    //region Logic
    renderLabList = () => {
        return (
            <List children={
                this.state.user.labs.map((lab) => {
                    return <ListItem
                        primaryText={lab.name}
                        key={lab.id}
                        containerElement={<Link to={this.props.location.pathname + '/' + lab.id}/>}
                    />
                })
            }/>
        );
    };
    //endregion
}