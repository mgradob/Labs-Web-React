/**
 * Created by mgradob on 1/26/17.
 */
import React from 'react';

import BaseView from './view-base';

import AuthStore from '../commons/store-auth';

class AuthenticatedView extends BaseView {
    componentWillMount() {
        this.setState({
            user: AuthStore._getUser(),
            token: AuthStore._getToken(),
            lab: AuthStore._getLab(),
            showProgress: false
        });
    }
}

export default AuthenticatedView;