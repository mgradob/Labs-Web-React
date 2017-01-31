/**
 * Created by mgradob on 1/25/17.
 */
import Dispatcher from '../dispatcher';
import Constants from  '../constants';

export function goToView(view_alias, extras) {
    Dispatcher.dispatch({
        type: Constants.APP_STATE.NAV_STATE,
        data: {
            view: view_alias,
            extras: extras
        }
    });
}