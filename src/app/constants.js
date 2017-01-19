/**
 * Created by mgradob on 12/19/16.
 */

module.exports = {
    BASE_URL: 'http://localhost:8080',
    Actions: {
        SignUp: {
            SIGN_UP_USER: "SIGN_UP_USER",
            GET_LABS: "GET_LABS",
            ADD_LABS: "ADD_LABS",
            FINISH: "FINISH"
        },
        SignIn: {
            SIGN_IN_USER: "SIGN_IN_USER"
        }
    },
    Responses: {
        Generics: {
            ERROR: "ERROR"
        },
        SignUp: {
            SIGNED_UP_USER: "SIGNED_UP_USER",
            ALREADY_REGISTERED: "ALREADY_REGISTERED",
            GOT_LABS: "GOT_LABS",
            ADDED_LABS: "ADDED_LABS",
            FINISHED: "FINISHED"
        },
        SignIn: {
            SIGNED_IN_USER: "SIGNED_IN_USER"
        }
    },
    Api_Errors: {
        ERROR: 200,
        ALREADY_REGISTERED: 211
    }
};