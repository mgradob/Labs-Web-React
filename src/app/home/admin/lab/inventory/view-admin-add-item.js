/**
 * Created by mgradob on 2/11/17.
 */
import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {Card, CardActions, CardTitle, CardText} from "material-ui/Card";

export default class AddItemView extends React.Component {
    //region Component
    constructor() {
        super();

        this.setState({
            name: null,
            note: null,
            total: null,
            available: null
        });
    }

    render() {
        return (
            <Card>
                <CardTitle title='Agregar Item'/>

                <CardText>
                    <TextField
                        hint='Nombre'
                        floatingLabelText='Nombre'
                        onChange={this._setName.bind(this)}
                    />
                    <br/>

                    <TextField
                        hint='Notas'
                        floatingLabelText='Notas'
                        onChange={this._setNotes.bind(this)}
                    />
                    <br/>

                    <TextField
                        hint='Total'
                        floatingLabelText='Total'
                        onChange={this._setTotal.bind(this)}
                    />
                    <br/>

                    <TextField
                        hint='Disponible'
                        floatingLabelText='Disponible'
                        onChange={this._setAvailable.bind(this)}
                    />
                    <br/>
                </CardText>

                <CardActions>
                    <FlatButton label='Cancelar' onTouchTap={this.props.onCancelClick}/>,
                    <RaisedButton label='Agregar' primary={true} disabled={this._disableOkButton()}
                                  onTouchTap={this._createItem.bind(this)}/>
                </CardActions>
            </Card>
        );
    }

    //endregion

    //region Logic
    _setName = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    _setNotes = (e) => {
        this.setState({
            note: e.target.value
        });
    };

    _setTotal = (e) => {
        this.setState({
            total: e.target.value
        });
    };

    _setAvailable = (e) => {
        this.setState({
            available: e.target.value
        });
    };

    _disableOkButton = () => {
        return (!this.state.name || this.state.name === '') ||
            (!this.state.note || this.state.note === '') ||
            (!this.state.total || this.state.total === '') ||
            (!this.state.available || this.state.available === '');
    };

    _createItem = () => {
        let item = {};
        item.name = this.state.name;
        item.note = this.state.note;
        item.total = this.state.total;
        item.available = this.state.available;

        this.props.onOkClick(item);
    };
    //endregion
}
