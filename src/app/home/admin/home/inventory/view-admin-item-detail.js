/**
 * Created by mgradob on 1/31/17.
 */
import React from 'react';

import Axios from 'axios';
import Constants from '../../../../constants';

import AuthenticatedView from '../../../../base/view-base-authenticated';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class AdminItemDetailView extends AuthenticatedView {
    //region Component
    componentWillMount() {
        this.setState({
            item: this.props.item
        });
    }

    render() {
        return(
            <Dialog
                title={this.state.item.name}

            >
            </Dialog>
        );
    }
    //endregion

    //region Logic
    _getActions = () => {
        return [
            <FlatButton 
                label='Cancel'
                onTouchTap={}
            />,
            <FlatButton 
                label='Guardar'
                primary={true}
                onTouchTap={}
            />
        ];
    }
    //endregion
}