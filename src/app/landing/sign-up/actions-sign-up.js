/**
 * Created by mgradob on 12/22/16.
 */
import dispatcher from "../../dispatcher";
import Constants from "../../constants";

export function signUpUser(signUpInfo) {
    dispatcher.dispatch({
        type: Constants.Actions.SignUp.SIGN_UP_USER,
        signUpInfo
    });
}

export function getLabs(userId) {
    dispatcher.dispatch({
        type: Constants.Actions.SignUp.GET_LABS,
        id_user: userId
    });
}

export function addLabs(labs) {
    dispatcher.dispatch({
        type: Constants.Actions.SignUp.ADD_LABS,
        labs
    });
}

export function finish() {
    dispatcher.dispatch({
        type: Constants.Actions.SignUp.FINISH
    });
}