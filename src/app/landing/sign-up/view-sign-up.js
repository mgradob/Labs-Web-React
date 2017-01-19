/**
 * Created by mgradob on 12/18/16.
 */
import React from "react";

import SignUpStore from './store-sign-up';
import * as SignUpActions from './actions-sign-up';
import Constants from '../../constants';

import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import {Stepper, Step, StepLabel} from 'material-ui/Stepper';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

class SignUpForm extends React.Component {
    constructor() {
        super();

        this.state = {
            full_name: '',
            id_user: '',
            password: '',
            career: '',
            campus: ''
        };
    }

    _setUserName = (e) => {
        this.setState({
            full_name: e.target.value
        });
    };

    _setUserId = (e) => {
        this.setState({
            id_user: e.target.value
        });
    };

    _setPassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    _setCareer = (e) => {
        this.setState({
            career: e.target.value
        });
    };

    _setCampus = (e) => {
        this.setState({
            campus: e.target.value
        });
    };

    _enableSignUpButton = () => {
        return this.state.full_name !== '' &&
            this.state.id_user !== '' &&
            this.state.password !== '' &&
            this.state.career !== '' &&
            this.state.campus !== '';
    };

    _signUpUser = () => {
        console.log('Signing Up', this.state);

        let signUpInfo = {
            full_name: this.state.full_name,
            id_user: this.state.id_user,
            password: this.state.password,
            career: this.state.career,
            campus: this.state.campus
        };

        SignUpActions.signUpUser(signUpInfo);
    };

    render() {
        return (
            <div>
                <TextField
                    hintText='Juan Paco Pedro de la Mar'
                    floatingLabelText='Nombre Completo'
                    onChange={this._setUserName.bind(this)}
                />
                <br/>

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

                <TextField
                    hintText='ITE'
                    floatingLabelText='Carrera'
                    onChange={this._setCareer.bind(this)}
                />
                <br/>

                <TextField
                    hintText='Chihuahua'
                    floatingLabelText='Campus'
                    onChange={this._setCampus.bind(this)}
                />
                <br/>
                <br/>

                <FlatButton
                    label="Registrarse"
                    primary={true}
                    disabled={!this._enableSignUpButton()}
                    onTouchTap={this._signUpUser.bind(this)}
                />
            </div>
        );
    }
}

class SignUpLabsList extends React.Component {
    constructor() {
        super();

        this._gotLabs = this._gotLabs.bind(this);
        this._addLabsToUser = this._addLabsToUser.bind(this);

        this.state = {
            availableLabs: [],
            selectedLabs: []
        };
    }

    componentWillMount() {
        SignUpActions.getLabs(this.props.idUser);

        SignUpStore.on(Constants.Responses.SignUp.GOT_LABS, this._gotLabs);
    }

    componentWillUnmount() {
        SignUpStore.removeListener(Constants.Responses.SignUp.GOT_LABS, this._gotLabs);
    }

    _gotLabs = (labs) => {
        this.setState({
            availableLabs: labs
        });
    };

    _addAvailableLabToList = (event) => {
        let lab = event.target.value;

        console.log('Register', 'Add labs to list', lab);

        let index = this.state.selectedLabs.indexOf(lab);

        if (index < 0) {
            this.setState({
                selectedLabs: this.state.selectedLabs.push(lab)
            });

            console.log('Register', 'Add lab to list', 'index: ' + index, this.state.selectedLabs);
        } else {
            this.setState({
                selectedLabs: this.state.selectedLabs.splice(index, 1)
            });

            console.log('Register', 'Remove lab to list', 'index: ' + index, this.state.selectedLabs);
        }
    };

    _addLabsToUser = () => {
        console.log('Register', 'Add labs', this.state.selectedLabs);
    };

    render() {
        return (
            <div>
                <p>Selecciona los laboratorios a los cuales te deseas registrar.</p>
                <br/>

                <List>
                    {
                        this.state.availableLabs.map((lab) => {
                            return <ListItem
                                key={lab.id}
                                leftCheckbox={<Checkbox onCheck={this._addAvailableLabToList}/>}
                            >
                                {lab.name}
                            </ListItem>;
                        })
                    }
                </List>

                <FlatButton
                    label="Agregar"
                    primary={true}
                    disabled={this.state.selectedLabs.length === 0}
                    onTouchTap={this._addLabsToUser}
                />
            </div>
        );
    }
}

class SignUpFinished extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.alreadyRegistered ? 'Ya te encuentras registrado.' : ''} Ahora solo te falta la
                    aprovación de alguno de los laboratorios. Una vez que un laboratorio te haya
                    aceptado podrás acceder a la plataforma.</p>
                <br/>

                <FlatButton
                    label="Finalizar"
                    primary={true}
                    onTouchTap={this.props.finish}
                />
            </div>
        );
    }
}

export default class SignUpView extends React.Component {
    STATE_FILL_INFO = 0;
    STATE_SELECT_LABS = 1;
    STATE_FINISHED = 2;

    constructor() {
        super();

        this._alreadyRegistered = this._alreadyRegistered.bind(this);
        this._goToLabsList = this._goToLabsList.bind(this);
        this._goToFinish = this._goToFinish.bind(this);
        this._finishRegistration = this._finishRegistration.bind(this);
        this._error = this._error.bind(this);

        this.state = {
            signUpState: this.STATE_FILL_INFO,
            alreadyRegistered: false,
            id_user: ''
        };
    }

    _alreadyRegistered = () => {
        console.log('Register', 'Already registered');

        this.setState({
            alreadyRegistered: true,
            signUpState: this.STATE_FINISHED
        });
    };

    _goToLabsList = (id_user) => {
        console.log('Register', 'Go to labs list', id_user);

        this.setState({
            signUpState: this.STATE_SELECT_LABS,
            id_user: id_user
        });
    };

    _goToFinish = () => {
        console.log('Register', 'Finish registration');

        this.setState({
            signUpState: this.STATE_FINISHED
        });
    };

    _finishRegistration = () => {
        console.log('Register', 'Finished');

        this.setState({
            signUpState: this.STATE_FILL_INFO,
            alreadyRegistered: false
        });
    };

    _error = () => {

    };

    componentWillMount() {
        SignUpStore.on(Constants.Responses.SignUp.SIGNED_UP_USER, this._goToLabsList);
        SignUpStore.on(Constants.Responses.SignUp.ALREADY_REGISTERED, this._alreadyRegistered);
        SignUpStore.on(Constants.Responses.SignUp.ADDED_LABS, this._goToFinish);
        SignUpStore.on(Constants.Responses.SignUp.FINISHED, this._finishRegistration);
        SignUpStore.on(Constants.Responses.Generics.ERROR, this._error);
    }

    componentWillUnmount() {
        SignUpStore.removeListener(Constants.Responses.SignUp.SIGNED_UP_USER, this._goToLabsList);
        SignUpStore.removeListener(Constants.Responses.SignUp.ALREADY_REGISTERED, this._alreadyRegistered);
        SignUpStore.removeListener(Constants.Responses.SignUp.ADDED_LABS, this._goToFinish);
        SignUpStore.removeListener(Constants.Responses.SignUp.FINISHED, this._finishRegistration);
        SignUpStore.removeListener(Constants.Responses.Generics.ERROR, this._error);
    }

    render() {
        let innerStepView = null;

        switch (this.state.signUpState) {
            default:
            case this.STATE_FILL_INFO:
                innerStepView = <SignUpForm/>;
                break;
            case this.STATE_SELECT_LABS:
                innerStepView = <SignUpLabsList idUser={this.state.id_user}/>;
                break;
            case this.STATE_FINISHED:
                innerStepView = <SignUpFinished
                    alreadyRegistered={this.state.alreadyRegistered}
                    finish={this._finishRegistration}
                />;
                break;
        }

        return (
            <div className="container">
                <h1>Registrarse</h1>

                <Stepper activeStep={this.state.signUpState}>
                    <Step>
                        <StepLabel>Llenar información</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Seleccionar laboratorios</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Listo</StepLabel>
                    </Step>
                </Stepper>

                {innerStepView}
            </div>
        );
    }
}
