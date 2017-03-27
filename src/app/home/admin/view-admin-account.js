/**
 * Created by mgradob on 3/11/17.
 */
import React from "react";
import * as AuthUtil from "../../utils/auth-util";
import ResetPasswordDialog from "../../commons/dialog-reset-password";
import CircularProgress from "material-ui/CircularProgress";
import FlatButton from "material-ui/FlatButton";

export default class AdminAccountView extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            user: null,
            showResetPassword: false
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

    renderUserForm = () => {
        return (
            <div>
                <h1>{this.state.user.name}</h1>

                <h2>{this.state.user.id}</h2>

                <p>Email: {this.state.user.email}</p>

                <p>Campus: {this.state.user.campus}</p>

                <FlatButton 
                    label='Cambiar password'
                    primary={true}
                    onTouchTap={this.toggleShowResetPassword.bind(this)}
                />

                {this.renderResetPasswordDialog()}
            </div>
        );
    };

    renderResetPasswordDialog = () => {
        if (this.state.showResetPassword) 
            return(
                <ResetPasswordDialog open={this.state.showResetPassword} onRequestClose={this.toggleShowResetPassword.bind(this)} email={this.state.user.email}/>
            );
        else return null;
    };
    //endregion

    //region Logic
    toggleShowResetPassword = () => this.setState({showResetPassword: !this.state.showResetPassword});
    //endregion
}