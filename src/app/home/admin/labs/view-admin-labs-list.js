/**
 * Created by mgradob on 1/25/17.
 */
import React from 'react';

import AuthenticatedView from '../../../base/view-base-authenticated';

import * as AuthActions from '../../../commons/actions-auth';

import {List, ListItem} from 'material-ui/List';

export default class AdminLabsListView extends AuthenticatedView {
    //region Component
    render() {
        return(
            <div>
                <p>Estos son los laboratorios a los que tienes acceso:</p>

                <List children={
                    this.state.user.labs.map((lab) => {
                        return <LabListItem lab={lab} key={lab.id} onLabClicked={this._onLabClicked.bind(this)}/>
                    })
                }/>
            </div>
        );
    }
    //endregion

    //region Logic
    _onLabClicked = (lab) => {
        AuthActions.saveLab(lab);
        this.props.router.push('/admin/home/');
    };
    //endregion
}

class LabListItem extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            lab: null
        };
    }

    componentWillMount() {
        this.setState({
            lab: this.props.lab
        });
    }

    render() {
        return (
            <ListItem
                primaryText={this.state.lab.name}
                onTouchTap={this._onLabClicked.bind(this)}
            />
        );
    }
    //endregion

    //region Logic
    _onLabClicked = () => {
        this.props.onLabClicked(this.state.lab);
    };
    //endregion
}