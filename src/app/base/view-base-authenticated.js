/**
 * Created by mgradob on 1/26/17.
 */
import React from 'react';

import AuthStore from '../commons/store-auth';

export default class AuthenticatedView extends React.Component {
    constructor() {
        super();

        this.state = {
            user: AuthStore._getUser(),
            token: AuthStore._getToken(),
            lab: AuthStore._getLab(),
            showProgress: false
        }
    }
}