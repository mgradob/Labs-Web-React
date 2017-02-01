/**
 * Created by mgradob on 1/26/17.
 */
import React from 'react';

import HeaderView from './view-header';

import Divider from 'material-ui/Divider';

export default class ErrorView extends React.Component {
    render() {
        return(
            <div>
                <HeaderView/>

                <Divider />
                <br/>

                <h1>Error</h1>
                <h2>Page not found</h2>
                <h3>:(</h3>
            </div>
        )
    }
}