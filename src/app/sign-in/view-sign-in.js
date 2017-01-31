/**
 * Created by mgradob on 12/18/16.
 */
import React from "react";

import * as NavActions from '../commons/actions-nav';
import * as AuthActions from '../commons/actions-auth';

import Axios from 'axios';
import Constants from '../constants';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import ProgressBar from 'material-ui/LinearProgress';

export default class SignInView extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            id_user: '',
            password: '',
            showProgress: false
        }
    }

    render() {
        let progressBar = null;
        if (this.state.showProgress) progressBar = <ProgressBar mode="indeterminate"/>;

        return (
            <div>
                {progressBar}

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

                <RaisedButton
                    label="Entrar"
                    primary={true}
                    disabled={!this._enableSignInButton()}
                    onTouchTap={this._signInUser.bind(this)}
                />

                <FlatButton
                    label="Cancelar"
                    onTouchTap={this._goBack.bind(this)}
                />
            </div>
        );
    };
    //endregion

    //region Form Logic
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
        return (this.state.id_user !== '' && this.state.password !== '') || this.state.showProgress;
    };

    _goBack = () => NavActions.goToView(Constants.APP_STATE.VIEWS.LANDING);
    //endregion

    //region Services
    _signInUser = () => {
        this.setState({
            showProgress: true
        });

        let url = Constants.BASE_URL + '/signin';

        let body = {
            id_user: this.state.id_user,
            password: this.state.password
        };

        Axios.post(url, body)
            .then((response) => {
                console.log('SignInStore', 'Sign In', response.data);

                this.setState({
                    showProgress: false
                });

                let user = response.data.data.user;
                let token = response.data.data.token;

                AuthActions.saveSession(user, token);

                if (user.user_type === 'admin')
                    NavActions.goToView(Constants.APP_STATE.VIEWS.ADMIN_LABS);
            })
            .catch((error) => {
                console.error('SignInStore', 'Sign In', error);

                this.setState({
                    showProgress: false
                });
            });
    };
    //endregion
}
