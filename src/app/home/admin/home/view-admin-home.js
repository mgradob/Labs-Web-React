/**
 * Created by mgradob on 1/31/17.
 */
import React from 'react';

import AdminNavBar from '../view-admin-nav-bar';

export default class AdminView extends React.Component {
    //region Component
    render() {
        return(
            <div>
                <AdminNavBar location={this.props.location}/>

                {this.props.children}
            </div>
        );
    }
    //endregion
}
