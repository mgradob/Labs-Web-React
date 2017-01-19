/**
 * Created by mgradob on 12/24/16.
 */
import dispatcher from "../../dispatcher";
import Constants from "../../constants";

export function signInUser(signInInfo) {
    dispatcher.dispatch({
        type: Constants.Actions.SignIn.SIGN_IN_USER,
        signInInfo: signInInfo
    });
}