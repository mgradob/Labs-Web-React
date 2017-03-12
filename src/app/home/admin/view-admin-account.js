/**
 * Created by mgradob on 3/11/17.
 */
import React from "react";
import * as AuthUtil from "../../utils/auth-util";
import CircularProgress from "material-ui/CircularProgress";

export default class AdminAccountView extends React.Component {
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
                {this.state.user != null ? this.renderUserForm() : <CircularProgress/>}
            </div>
        );
    }

    //endregion

    //region Logic
    renderUserForm = () => {
        return (
            <div>
                <h1>{this.state.user.name}</h1>

                <h2>{this.state.user.id}</h2>

                <p>Email: {this.state.user.email}</p>

                <p>Campus: {this.state.user.campus}</p>
            </div>
        );
    };
    //endregion
}