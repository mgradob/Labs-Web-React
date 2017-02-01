/**
 * Created by mgradob on 1/31/17.
 */
import React from 'react'

import Axios from 'axios';
import Constants from '../../../../../constants';

import AuthenticatedView from '../../../../../base/view-base-authenticated';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';

export default class AdminInventoryDetailView extends AuthenticatedView {
    //region Component
    componentWillMount() {
        this.setState({
            showProgress: false,
            category: null,
            showAddForm: false
        });

        this._getCategory();
    }

    render() {
        let addForm;
        if (this.state.showAddForm) addForm = this._renderAddForm();

        if (this.state.category === null) return <div></div>;
        return (
            <div>
                <TextField
                    label={this.state.category.name}
                    floatingLabelText={this.state.category.name}
                    onChange={this._setCategoryName.bind(this)}
                />
                <br/>

                <h3>Items</h3>
                <RaisedButton
                    label="Agregar Item"
                    primary={true}
                    onTouchTap={this._showAddForm.bind(this)}
                />
                <br/>

                {addForm}
            </div>
        );
    }

    //endregion

    //region Logic
    _setCategoryName = (e) => {
        let tempCat = this.state.category;
        tempCat.name = e.target.value;

        this.setState({
            category: tempCat
        });
    };

    _showAddForm = () => {
        this.setState({
            showAddForm: true
        });
    };

    _renderAddForm = () => {
        return (
            <Card>
                <CardTitle title='Nuevo Item'/>

                <TextField
                    hint='Nombre'
                    floatingLabelText='Nombre'
                />
                <br/>

                <TextField
                    hint='Notas'
                    floatingLabelText='Notas'
                />
                <br/>

                <TextField
                    hint='Total'
                    floatingLabelText='Total'
                />
                <TextField
                    hint='Disponible'
                    floatingLabelText='Disponible'
                />
                <br/>

                <CardActions>
                    <FlatButton label='Cancelar'/>
                    <RaisedButton label='Agregar' primary={true}/>
                </CardActions>
            </Card>
        );
    };
    //endregion

    //region Services
    _getCategory = () => {
        this.setState({
            showProgress: true
        });

        let url = Constants.BASE_URL + '/inventory/' + this.state.lab.id + '/' + this.props.params.category_id;

        Axios.get(url, {
            headers: {
                "Authorization": this.state.token
            },
            params: {
                id_user: this.state.user.id_user
            }
        }).then((response) => {
            console.log('Admin Home Inventory', 'Get Category', response.data);

            let data = response.data.data;

            this.setState({
                showProgress: false,
                category: data
            });
        }).catch((error) => {
            console.error('Admin Home Inventory', 'Get Category', error);

            this.setState({
                showProgress: false
            });
        });
    };
    //endregion
}