/**
 * Created by mgradob on 1/31/17.
 */
import React from 'react';

import HeaderView from '../../commons/view-header';

export default class AdminView extends React.Component {
    //region Component
    render() {
        return(
            <div>
                <HeaderView/>

                {this.props.children}
            </div>
        );
    }
    //endregion
}