/**
 * Created by mgradob on 1/26/17.
 */
import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';

import Constants from '../constants';

class NavStore extends EventEmitter {
    _handleActions = (action) => {
        switch (action.type) {
            case Constants.APP_STATE.NAV_STATE:
                this.emit(Constants.APP_STATE.NAV_STATE, action.data);

                break;
            default:
                break;
        }
    };
}

const navStore = new NavStore();

Dispatcher.register(navStore._handleActions.bind(navStore));

export default navStore;