/**
 * Created by mgradob on 2/11/17.
 */
import React from "react";
import AddItemView from "./view-admin-add-item";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {List, ListItem} from "material-ui/List";

export default class AddCategoryView extends React.Component {
    //region Component
    constructor() {
        super();

        this.setState({
            name: null,
            items: [],
            addItem: false,
            editItem: false
        });
    }

    render() {
        let addButton = null;
        if (!this.state.addItem) addButton =
            <FlatButton label='Agregar Item' primary={true} onTouchTap={this._showAddItemView.bind(this)}/>;

        return (
            <div>
                <h2>Agregar Categoría</h2>

                <TextField
                    hint='Nombre'
                    floatingLabelText='Nombre'
                    onChange={this._setName.bind(this)}
                />
                <br/>

                <RaisedButton
                    label='Agregar'
                    primary={true}
                    disabled={!this.state.name || this.state.name === ''}
                    onTouchTap={this._postCategory.bind(this)}
                />
                <br/>
                <br/>

                <h3>Items</h3>
                <Divider />

                {this._renderItemsList()}

                {this._renderAddItemView()}

                {this._renderEditItemView()}

                <br/>

                {addButton}
            </div>
        );
    }

    //endregion

    //region Renders
    _renderItemsList = () => {
        let itemsList;
        if (this.state.items.length > 0)
            itemsList = <List children={
                this.state.items.map((item, index) => {
                    return <ItemListItem key={index} item={item}/>
                })
            }/>;
        else itemsList = <p>La categoría se creará vacía. Puedes agregar items ahora o más adelante.</p>;

        return itemsList;
    };

    _renderAddItemView = () => {
        let view = null;
        if (this.state.addItem) view = <AddItemView onOkClick={this._addItemListener.bind(this)}
                                                    onCancelClick={this._dismissAddItemView.bind(this)}/>;

        return view;
    };

    _renderEditItemView = () => {
        let view;
        if (this.state.editItem) view = null;
        else view = null;

        return view;
    };
    //endregion

    //region Logic
    _setName = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    _showAddItemView = () => {
        this.setState({
            addItem: true
        });
    };

    _dismissAddItemView = () => {
        this.setState({
            addItem: false
        });
    };

    _showEditItemView = () => {
        this.setState({
            editItem: true
        });
    };

    _dismissEditItemView = () => {
        this.setState({
            editItem: false
        });
    };

    _addItemListener = (item) => {
        let tempItems = this.state.items;
        tempItems.push(item);

        this.setState({
            items: tempItems
        });
    };
    //endregion

    //region Services
    _postCategory = () => {

    };
    //endregion
}

class ItemListItem extends React.Component {
    //region Component
    componentWillMount() {
        this.setState({
            item: this.props.item
        });
    }

    render() {
        return (
            <ListItem
                primaryText={this.state.item.name + ' | ' + this.state.item.note}
                secondaryText={'Disponible: ' + this.state.item.available + ' | Total: ' + this.state.item.total}
            />
        )
    }

    //endregion
}