/**
 * Created by mgradob on 1/25/17.
 */
import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';

import Constants from '../constants';

class AuthStore extends EventEmitter {
    user = null;
    token = null;
    lab = null;

    _handleActions = (action) => {
        switch (action.type) {
            case Constants.ACTIONS.BASE.SAVE_SESSION:
                this.user = action.data.user;
                this.token = action.data.token;
                break;
            case Constants.ACTIONS.BASE.SAVE_LAB:
                this.lab = action.data.lab;
                break;
            default:
                break;
        }
    };

    _getUser = () => {
        return this.user;
    };

    _getToken = () => {
        return this.token;
    };

    _getLab = () => {
        return this.lab;
    };
}

const authStore = new AuthStore();

Dispatcher.register(authStore._handleActions.bind(authStore));

export default authStore;