/**
 * Created by mgradob on 2/3/17.
 */
import React from 'react'

import Axios from 'axios';
import Constants from '../../../../constants';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class EditItemView extends React.Component {
    //region Component
    constructor() {
        super();

        this.setState({
            item: null
        });

        this._getItem();
    }

    render() {
        let view = null;
        if (this.state.item === null) view = this._renderLoading();
        else view = this._renderForm();

        return (
            <div>
                {view}
            </div>
        );
    }
    //endregion

    //region logic
    _renderLoading = () => {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    };

    _renderForm = () => {
        return (
            <div>
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

                <FlatButton label='Cancelar'/>,
                <RaisedButton label='Actualizar' primary={true}/>
            </div>
        );
    };
    //endregion

    //region Services
    _getItem = () => {
        let url = Constants.BASE_URL + '/inventory/' + this.state.lab.id + '/' + this.props.params.category_id + '/' + this.props.params.item_id;

        Axios.get(url, {
            headers: {
                "Authorization": this.state.token
            },
            params: {
                id_user: this.state.user.id_user
            }
        }).then((response) => {
            console.log('Admin Home Inventory', 'Get Item', response.data);

            let data = response.data.data;

            this.setState({
                item: data
            });
        }).catch((error) => {
            console.error('Admin Home Inventory', 'Get Item', error);
        });
    };
    //endregion
}