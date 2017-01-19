/**
 * Created by mgradob on 12/18/16.
 */
import React from "react";

import SignInStore from './store-sign-in';
import * as SignInActions from './actions-sign-in';
import Constants from '../../constants';

import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

export default class SignInView extends React.Component {
    state = {
        id_user: '',
        password: ''
    };

    _setUserId = (e) => {
        this.setState({
            id_user: e.target.value
        });
    };

    _setPassword = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    _enableSignInButton = () => {
        return this.state.id_user !== '' &&
                this.state.password !== '';
    };

    _signInUser = () => {
        console.log('Signing In', this.state);

        let signInInfo = {
            id_user: this.state.id_user,
            password: this.state.password
        };

        SignInActions.signInUser(signInInfo);
    };

    _error = () => {

    };

    componentWillMount() {
        SignInStore.on(Constants.Responses.Generics.ERROR, this._error);
    }

    componentWillUnmount() {
        SignInStore.removeListener(Constants.Responses.Generics.ERROR, this._error);
    }

    render() {
        return (
            <div className="container">
                <h1>Entrar</h1>

                <p>Introduce tu información para ingresar. La matrícula debe tener el formato 'A0' o 'L0'.</p>

                <TextField
                    hintText='A01234567'
                    floatingLabelText='Matrícula'
                    onChange={this._setUserId.bind(this)}
                />
                <br/>

                <TextField
                    floatingLabelText='Password'
                    type='password'
                    onChange={this._setPassword.bind(this)}
                />
                <br/>
                <br/>

                <FlatButton
                    label="Sign In"
                    primary={true}
                    disabled={!this._enableSignInButton()}
                    onTouchTap={this._signInUser.bind(this)}
                />
            </div>
        );
    };
}