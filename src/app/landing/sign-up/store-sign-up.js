/**
 * Created by mgradob on 12/22/16.
 */
import {EventEmitter} from "events";
import dispatcher from "../../dispatcher";
import Constants from "../../constants";
import axios from 'axios';

class SignUpStore extends EventEmitter {
    constructor() {
        super();
    }

    _handleActions = (action) => {
        console.log('Received action', JSON.stringify(action));

        switch (action.type) {
            case Constants.Actions.SignUp.SIGN_UP_USER: {
                console.log('Register', 'Registering', action.signUpInfo);

                axios.post(Constants.BASE_URL + '/signup', action.signUpInfo)
                    .then((response) => {
                        console.log('Register', 'Response', JSON.stringify(response.data));

                        if (response.data.status === Constants.Api_Errors.ALREADY_REGISTERED)
                            this.emit(Constants.Responses.SignUp.ALREADY_REGISTERED);
                        else if (response.data.status === Constants.Api_Errors.ERROR)
                            this.emit(Constants.Responses.Generics.ERROR);
                        else
                            this.emit(Constants.Responses.SignUp.SIGNED_UP_USER, action.signUpInfo.id_user);
                    })
                    .catch((error) => {
                        console.log('Register', error);
                    });

                break;
            }
            case Constants.Actions.SignUp.GET_LABS: {
                console.log('Get labs', 'Getting labs', action.id_user);

                axios.get(Constants.BASE_URL + '/signup/' + action.id_user)
                    .then((response) => {
                        console.log('Get labs', 'Response', JSON.stringify(response.data));

                        this.emit(Constants.Responses.SignUp.GOT_LABS, response.data.data);
                    })
                    .catch((error) => {
                        console.log('Get labs', error);
                    });

                break;
            }
            case Constants.Actions.SignUp.ADD_LABS: {

                break;
            }
            case Constants.Actions.SignUp.FINISH: {
                this.emit(Constants.Responses.SignUp.FINISHED);

                break;
            }
        }
    }
}

const signUpStore = new SignUpStore();

dispatcher.register(signUpStore._handleActions.bind(this));

export default signUpStore;