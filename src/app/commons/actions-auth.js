/**
 * Created by mgradob on 1/25/17.
 */
import Dispatcher from '../dispatcher';
import Constants from  '../constants';

export function saveSession(user, token) {
    Dispatcher.dispatch({
        type: Constants.ACTIONS.BASE.SAVE_SESSION,
        data: {
            user: user,
            token: token
        }
    });
}

export function saveLab(lab) {
    Dispatcher.dispatch({
        type: Constants.ACTIONS.BASE.SAVE_LAB,
        data: {
            lab: lab
        }
    });
}