/**
 * Created by mgradob on 3/19/17.
 */
import React from "react";
import * as Firebase from "firebase";
import * as RefUtil from "../utils/refrerences-util";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

export default class ResetPasswordDialog extends React.Component {
    //region Component
    render() {
        let actions = [
            <FlatButton
                label="Cancelar"
                onTouchTap={this.props.onRequestClose}
            />,
            <FlatButton
                label="Cambiar"
                primary={true}
                onTouchTap={this.resetPassword.bind(this)}
            />
        ];

        return (
            <Dialog
                title='Cambiar password'
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                actions={actions}
            >
                Se enviará un correo a tu cuenta con una liga que debes seguir para cambiar tu password. <b>El cambio de password es irreversible, deseas continuar?</b>
            </Dialog>
        );
    }

    //endregion

    //region Logic
    resetPassword = () => {
        Firebase.auth().sendPasswordResetEmail(this.props.email)
            .then(() => {
                console.log('Firebase', 'Reset password', 'Success');

                this.props.onRequestClose();
            })
            .catch(err => {
                console.error('Firebase', 'Reset password', err);
            });
    }
    //endregion
}