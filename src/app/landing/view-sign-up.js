/**
 * Created by mgradob on 12/18/16.
 */
import React from "react";
import * as Firebase from "firebase";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {Stepper, Step, StepLabel, StepContent} from "material-ui/Stepper";
import ProgressBar from "material-ui/LinearProgress";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {List, ListItem} from "material-ui/List";
import Checkbox from "material-ui/Checkbox";

class SignUpView extends React.Component {
    STEP_FULL_NAME = 0;
    STEP_ID_USER = 1;
    STEP_CAREER = 2;
    STEP_CAMPUS = 3;
    STEP_PASSWORD = 4;
    STEP_LABS = 5;
    STEP_FINISHED = 6;

    campuses = [
        'Chihuahua'
    ];

    authRef;
    labsRef;
    availableLabsRef;
    usersRef;

    //region Component
    constructor() {
        super();

        this.state = {
            step: this.STEP_FULL_NAME,
            showProgress: false,
            full_name: '',
            id_user: '',
            career: '',
            campus: this.campuses[0],
            password: '',
            availableLabs: [],
            selectedLabs: []
        };

        this.authRef = Firebase.auth();
        this.labsRef = Firebase.database().ref().child('labs');
        this.availableLabsRef = Firebase.database().ref().child('available-labs');
        this.usersRef = Firebase.database().ref().child('users');
    }

    componentWillUnmount() {
        this.setState({
            step: this.STEP_FULL_NAME,
            showProgress: false,
            full_name: '',
            id_user: '',
            career: '',
            campus: this.campuses[0],
            password: '',
            availableLabs: [],
            selectedLabs: []
        });
    }

    render() {
        let stepView = this._getStepView();
        let actions = this._getStepActions();

        let progressBar = null;
        if (this.state.showProgress) progressBar = <ProgressBar mode='indeterminate'/>;

        return (
            <div className="container">
                {progressBar}

                <Stepper activeStep={this.state.step} orientation='vertical'>
                    <Step>
                        <StepLabel>Nombre Completo</StepLabel>
                        <StepContent>
                            {stepView}
                            <br/>
                            {actions}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Matrícula</StepLabel>
                        <StepContent>
                            {stepView}
                            <br/>
                            {actions}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Carrera</StepLabel>
                        <StepContent>
                            {stepView}
                            <br/>
                            {actions}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Campus</StepLabel>
                        <StepContent>
                            {stepView}
                            <br/>
                            {actions}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Password</StepLabel>
                        <StepContent>
                            {stepView}
                            <br/>
                            {actions}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Laboratorios</StepLabel>
                        <StepContent>
                            {stepView}
                            <br/>
                            {actions}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Finalizar</StepLabel>
                        <StepContent>
                            {stepView}
                            <br/>
                            {actions}
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    };

    //endregion

    //region Services
    _signUpUser = () => {
        this.authRef.createUserWithEmailAndPassword(this.state.id_user + '@itesm.mx', this.state.password)
            .then(user => {
                console.log('Firebase', 'Sign Up', 'Success', user);

                this.usersRef.child(this.state.id_user).set({
                    id: this.state.id_user,
                    name: this.state.full_name,
                    email: this.state.id_user + '@itesm.mx',
                    career: this.state.career,
                    campus: this.state.campus
                }).then(() => {
                    console.log('Firebase', 'Sign Up', 'Success', user);

                    this.setState({
                        step: this.state.step + 1,
                        showProgress: false
                    });

                    this._getLabs();
                }).catch(err => {
                    console.log('Firebase', 'Sign Up', 'Failed', err);

                    this.setState({
                        showProgress: false
                    });
                });
            })
            .catch(err => {
                console.log('Firebase', 'Sign Up', 'Failed', err);

                this.setState({
                    showProgress: false
                });

                if (err.code === 'auth/email-already-in-use') {
                    this.setState({
                        step: this.STEP_FINISHED
                    });
                }
            });
    };

    _getLabs = () => {
        this.availableLabsRef.child(this.state.campus)
            .on('child_added', snap => {
                console.log('Firebase', 'Sign Up', 'Available Labs', snap.val());
                let lab = snap.val();

                let tempLabs = this.state.availableLabs;
                tempLabs.splice(lab.id, 0, lab);

                this.setState({
                    availableLab: tempLabs
                });
            });
    };

    _postLabs = () => {
        if (this.state.selectedLabs.length > 0) {
            this.state.selectedLabs.map(lab => {
                this.labsRef.child(this.state.campus)
                    .child(lab.id)
                    .child('new-users')
                    .child(this.state.id_user)
                    .set({
                        id: this.state.id_user,
                        name: this.state.full_name,
                        date: Date.now()
                    })
                    .then(() => {
                        console.log('Firebase', 'Sign Up', 'Signed up on lab', lab.name);

                        this.setState({
                            showProgress: false,
                            step: this.STEP_FINISHED
                        });
                    })
                    .catch(() => {
                        console.log('Firebase', 'Sign Up', 'Error signing up on lab', lab.name);

                        this.setState({
                            showProgress: false
                        });
                    });
            });

            this.setState({
                showProgress: true
            });
        } else {
            this.setState({
                step: this.STEP_FINISHED
            });
        }
    };
    //endregion

    //region Setters
    _setFullName = (e) => {
        this.setState({
            full_name: e.target.value
        });
    };

    _setIdUser = (e) => {
        this.setState({
            id_user: e.target.value
        });
    };

    _setCareer = (e) => {
        this.setState({
            career: e.target.value
        });
    };

    _setCampus = (e, i, value) => {
        this.setState({
            campus: value
        });
    };

    _setPassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };
    //endregion

    //region Form logic
    _nextStep = () => {
        if (this.state.step === this.STEP_PASSWORD) {
            this._signUpUser();

            return;
        }

        if (this.state.step === this.STEP_LABS) {
            this._postLabs();

            return;
        }

        this.setState({
            step: this.state.step + 1
        })
    };

    _previousStep = () => {
        this.setState({
            step: this.state.step - 1
        })
    };

    _onLabClicked = (lab, checked) => {
        if (checked) this._addLabToSelected(lab);
        else this._removeLabFromSelected(lab);
    };

    _addLabToSelected = (lab) => {
        this.setState({
            selectedLabs: this.state.selectedLabs.concat(lab)
        });
    };

    _removeLabFromSelected = (lab) => {
        if (this.state.selectedLabs.length > 1) {
            let index = this.state.selectedLabs.indexOf(lab);

            this.setState({
                selectedLabs: this.state.selectedLabs.splice(index, 1)
            });
        } else this.setState({
            selectedLabs: []
        });
    };

    _getStepView = () => {
        switch (this.state.step) {
            default:
            case this.STEP_FULL_NAME:
                return <TextField hintText='Nombre Completo' floatingLabelText='Nombre Completo'
                                  onChange={this._setFullName.bind(this)}/>;
            case this.STEP_ID_USER:
                return <TextField hintText='Matrícula' floatingLabelText='Matrícula'
                                  onChange={this._setIdUser.bind(this)}/>;
            case this.STEP_CAREER:
                return <TextField hintText='ITE' floatingLabelText='Carrera'
                                  onChange={this._setCareer.bind(this)}/>;
            case this.STEP_CAMPUS:
                let campusMenuItems = this.campuses.map((campus) => {
                    return <MenuItem key={this.campuses.indexOf(campus)} value={campus} primaryText={campus}/>
                });

                return <SelectField value={this.state.campus} floatingLabelText='Campus'
                                    onChange={this._setCampus.bind(this)}>{campusMenuItems}</SelectField>;
            case this.STEP_PASSWORD:
                return <TextField floatingLabelText='Password' type='password'
                                  onChange={this._setPassword.bind(this)}/>;
            case this.STEP_LABS:
                let labsListItems = this.state.availableLabs.map((lab) => {
                    return <LabListItem lab={lab} key={lab.id} onLabClicked={this._onLabClicked.bind(this)}/>
                });

                return <List children={labsListItems}/>;
            case this.STEP_FINISHED:
                return <p>Ya te encuentras registrado. Ahora solo te falta la aprobación de alguno de los laboratorios.
                    Una vez que un laboratorio te haya aceptado podrás acceder a la plataforma.</p>;
        }
    };

    _getStepActions = () => {
        switch (this.state.step) {
            default:
            case this.STEP_FULL_NAME:
                return [
                    <FlatButton
                        key={0}
                        label='Atrás'
                        onTouchTap={this._goBack.bind(this)}
                    />,
                    <RaisedButton
                        key={1}
                        label='Continuar'
                        primary={true}
                        disabled={this.state.full_name === ''}
                        onTouchTap={this._nextStep.bind(this)}
                    />
                ];
            case this.STEP_ID_USER:
                return [
                    <FlatButton
                        key={0}
                        label='Atrás'
                        onTouchTap={this._previousStep.bind(this)}
                    />,
                    <RaisedButton
                        key={1}
                        label='Continuar'
                        primary={true}
                        disabled={this.state.id_user === ''}
                        onTouchTap={this._nextStep.bind(this)}
                    />
                ];
            case this.STEP_CAREER:
                return [
                    <FlatButton
                        key={0}
                        label='Atrás'
                        onTouchTap={this._previousStep.bind(this)}
                    />,
                    <RaisedButton
                        key={1}
                        label='Continuar'
                        primary={true}
                        disabled={this.state.career === ''}
                        onTouchTap={this._nextStep.bind(this)}
                    />
                ];
            case this.STEP_CAMPUS:
                return [
                    <FlatButton
                        key={0}
                        label='Atrás'
                        onTouchTap={this._previousStep.bind(this)}
                    />,
                    <RaisedButton
                        key={1}
                        label='Continuar'
                        primary={true}
                        disabled={this.state.campus === ''}
                        onTouchTap={this._nextStep.bind(this)}
                    />
                ];
            case this.STEP_PASSWORD:
                return [
                    <FlatButton
                        key={0}
                        label='Atrás'
                        onTouchTap={this._previousStep.bind(this)}
                    />,
                    <RaisedButton
                        key={1}
                        label='Guardar'
                        primary={true}
                        disabled={this.state.password === ''}
                        onTouchTap={this._nextStep.bind(this)}
                    />
                ];
            case this.STEP_LABS:
                return [
                    <RaisedButton
                        key={1}
                        label={this.state.selectedLabs.length > 0 ? 'Guardar' : 'Continuar'}
                        primary={true}
                        onTouchTap={this._nextStep.bind(this)}
                    />
                ];
            case this.STEP_FINISHED:
                return [
                    <RaisedButton
                        key={0}
                        label='Terminar'
                        primary={true}
                        onTouchTap={this._finishSignUp}
                    />
                ];
        }
    };

    _goBack = () => this.props.router.replace('/');

    _finishSignUp = () => this.props.router.replace('/');
    //endregion
}

class LabListItem extends React.Component {
    constructor() {
        super();

        this.state = {
            lab: null
        };
    }

    componentWillMount() {
        this.setState({
            lab: this.props.lab
        });
    }

    _onLabClicked = (e, isChecked) => {
        this.props.onLabClicked(this.state.lab, isChecked);
    };

    render() {
        return (
            <ListItem
                leftCheckbox={<Checkbox onCheck={this._onLabClicked.bind(this)}/>}
                primaryText={this.state.lab.name}
            />
        );
    }
}

export default SignUpView;