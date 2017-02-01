/**
 * Created by mgradob on 1/25/17.
 */
import React from 'react';

import HeaderView from './view-header';
import LandingNavBarView from '../landing/view-landing-nav-bar';

export default class MainView extends React.Component {
    //region Component

    render() {
        return (
            <div>
                <HeaderView/>

                <LandingNavBarView/>

                {this.props.children}
            </div>
        );
    }
    //endregion
}