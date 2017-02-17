/**
 * Created by mgradob on 1/25/17.
 */
import React from 'react';

import BaseView from '../base/view-base';
import HeaderView from './view-header';
import LandingNavBarView from '../landing/view-landing-nav-bar';

import Snackbar from 'material-ui/Snackbar';

export default class MainView extends BaseView {
    //region Component
    render() {
        return (
            <div>
                <HeaderView/>

                <LandingNavBarView/>

                {this.props.children}

                <Snackbar
                    open={this.state.showAlert}
                    message={this.state.alertMessage}
                    onRequestClose={this._handleAlertClose}
                    autoHideDuration={4000}
                />
            </div>
        );
    }
    //endregion
}