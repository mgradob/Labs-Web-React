/**
 * Created by mgradob on 12/19/16.
 */

module.exports = {
    BASE_URL: 'http://localhost:8080',
    API_RESPONSE: {
        success: {
            code: 100,
            message: 'OK'
        },
        failed: {
            generic: {
                code: 200,
                message: 'Error, razón desconocida'
            },
            no_data_found: {
                code: 201,
                message: 'Error, no se encontró información'
            },
            sign_up: {
                already_exists: {
                    code: 211,
                    message: 'Usuario ya existe'
                },
                no_data_found: {
                    code: 212,
                    message: 'Usuario no encontrado'
                }
            },
            sign_in: {
                missing_info: {
                    code: 221,
                    message: 'Falta matrícula o password'
                },
                wrong_info: {
                    code: 222,
                    message: 'Matrícula o password incorrecto'
                }
            },
            home: {
                no_labs_accepted: {
                    code: 231,
                    message: 'No ha sido aceptado a un laboratorio todavía'
                }
            },
            inventory: {
                category_already_exists: {
                    code: 241,
                    message: 'La categoría ya existe'
                }
            }
        },
        not_implemented_yet: {
            code: 300,
            message: 'Not implemented yet'
        },
        auth_failed: {
            no_token_provided: {
                code: 400,
                message: 'No token provided'
            },
            token_expired: {
                code: 401,
                message: 'Token expired'
            }
        }
    },
    APP_STATE: {
        NAV_STATE: 'NAV_STATE',
        VIEWS: {
            LANDING: 'LANDING',
            SIGN_IN: 'SIGN_IN',
            SIGN_UP: 'SIGN_UP',
            ACCOUNT_INFO: 'ACCOUNT_INFO',
            SIGN_OUT: 'SIGN_OUT',

            //region Admin
            ADMIN_LABS: 'ADMIN_LABS',
            ADMIN_HOME_DASHBOARD: 'ADMIN_HOME_DASHBOARD',
            ADMIN_HOME_REQUESTS: 'ADMIN_HOME_REQUESTS',
            ADMIN_HOME_INVENTORY: 'ADMIN_HOME_INVENTORY',
            ADMIN_HOME_NEW_USERS: 'ADMIN_HOME_NEW_USERS',
            ADMIN_HOME_USERS: 'ADMIN_HOME_USERS',
            //endregion

            //region User
            //endregion
        }
    },
    ACTIONS: {
        BASE: {
            SAVE_SESSION: 'SAVE_SESSION',
            SAVE_LAB: 'SAVE_LAB'
        },
        SIGN_IN: {
            SIGN_IN: 'SIGN_IN'
        },
        SIGN_UP: {
            SIGN_UP: 'SIGN_UP',
            GET_LABS: 'GET_LABS',
            ADD_LAB: 'ADD_LAB',
            REMOVE_LAB: 'REMOVE_LAB',
            ADD_LABS: 'ADD_LABS',
        },
        ADMIN: {
            HOME: {
                GO_TO_LAB: 'GO_TO_LAB'
            }
        }
    },
    STORES: {
        SIGN_IN: {
            DO_SIGN_IN: 'DO_SIGN_IN',
            SUCCESS_SIGN_IN: 'SUCCESS_SIGN_IN',
            ERROR_SIGN_IN: 'ERROR_SIGN_IN'
        },
        SIGN_UP: {
            DO_SIGN_UP: 'DO_SIGN_UP',
            SUCCESS_SIGN_UP: 'SUCCESS_SIGN_UP',
            ERROR_SIGN_UP: 'ERROR_SIGN_UP',
            ERROR_ALREADY_REGISTERED: 'ERROR_ALREADY_REGISTERED',
            DO_GET_LABS: 'DO_GET_LABS',
            SUCCESS_GET_LABS: 'SUCCESS_GET_LABS',
            ERROR_GET_LABS: 'ERROR_GET_LABS',
        }
    }
};
