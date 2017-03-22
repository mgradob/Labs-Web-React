/**
 * Created by mgradob on 12/18/16.
 */
import React from "react";
import * as AuthUtil from "../utils/auth-util";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import ProgressBar from "material-ui/LinearProgress";

export default class SignInView extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            id_user: '',
            password: '',
            showProgress: false
        };
    }

    render() {
        let progressBar = null;
        if (this.state.showProgress) progressBar = <ProgressBar mode="indeterminate"/>;

        return (
            <div className="container">
                {progressBar}

                <p>Introduce tu información para ingresar. La matrícula debe tener el formato 'A0' o 'L0'.</p>

                <TextField
                    hintText='a01234567@itesm.mx'
                    floatingLabelText='Email'
                    onChange={this._setUserId.bind(this)}
                />@itesm.mx
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
    //endregion

    //region Services
    _signInUser = () => {
        this.setState({showProgress: true});

        AuthUtil.signInUser(this.state.id_user, this.state.password)
            .then(user => {
                console.log('Firebase', 'SignIn', 'User Info', user);

                this.setState({showProgress: false});

                if (user.career === 'ADMIN') this.props.router.push('/admin');
            })
            .catch(err => this.setState({showProgress: false}));
    };
    //endregion
}