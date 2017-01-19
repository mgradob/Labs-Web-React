/**
 * Created by mgradob on 12/24/16.
 */
import {EventEmitter} from 'events';
import dispatcher from '../../dispatcher';
import Constants from "../../constants";
import axios from 'axios';

class SignInStore extends EventEmitter {
    constructor() {
        super();
    }

    _handleActions = (action) => {
        console.log('Received action', JSON.stringify(action));

        switch (action.type) {
            case Constants.Actions.SignIn.SIGN_IN_USER: {
                console.log('Sign In', 'Signin in', action.signInInfo);

                axios.post(Constants.BASE_URL + '/signin', action.signInInfo)
                    .then((response) => {
                        console.log('Register', 'Response', JSON.stringify(response.data));

                        this.emit(Constants.Responses.SignIn.SIGNED_IN_USER);
                    })
                    .catch((error) => {
                        console.log('Sign in', error);
                    });

                break;
            }
        }
    }
}

const signInStore = new SignInStore();

dispatcher.register(signInStore._handleActions.bind(this));

export default signInStore;