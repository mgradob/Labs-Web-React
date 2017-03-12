/**
 * Created by mgradob on 12/18/16.
 */
import React from "react";
import * as Firebase from "firebase";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import ProgressBar from "material-ui/LinearProgress";

class SignInView extends React.Component {
    authRef;
    usersRef;

    //region Component
    constructor() {
        super();

        this.state = {
            id_user: '',
            password: '',
            showProgress: false
        };

        this.authRef = Firebase.auth();
        this.usersRef = Firebase.database().ref().child('users');
    }

    render() {
        let progressBar = null;
        if (this.state.showProgress) progressBar = <ProgressBar mode="indeterminate"/>;

        return (
            <div className="container">
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
        this.setState({
            showProgress: true
        });

        this.authRef.signInWithEmailAndPassword(this.state.id_user + '@itesm.mx', this.state.password)
            .then(() => {
                console.log('Firebase', 'SignIn', 'Success', this.state.id_user + '@itesm.mx');

                this.usersRef.child(this.state.id_user)
                    .once('value')
                    .then(snap => {
                        console.log('Firebase', 'SignIn', 'User Info', snap.val());
                        let user = snap.val();

                        this.setState({
                            showProgress: false
                        });

                        if (user.career === 'ADMIN') this.props.router.push('/admin');
                    });
            })
            .catch(err => {
                console.log('Firebase', 'SignIn', 'Error', err);

                switch (err.code) {
                    case 'auth/user-disabled':
                        break;
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        break;
                }

                this.setState({
                    showProgress: false
                });
            });
    };
    //endregion
}

export default SignInView;
