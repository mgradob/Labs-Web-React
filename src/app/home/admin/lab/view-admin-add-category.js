/**
 * Created by mgradob on 3/11/17.
 */
import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import {Card, CardActions, CardHeader} from "material-ui/Card";

export default class AddCategoryView extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            name: '',
            description: '',
            items: [],
            showAddCard: false,
            showEditCard: false
        };
    }

    render() {
        return (
            <div>
                <h1>Nueva Categoría</h1>
                <RaisedButton label='Guardar' disabled={this.disableSaveButton()}/>
                <br/>

                <TextField hintText='Nombre' floatingLabelText='Nombre' onChange={this.setCategoryName.bind(this)}/>
                <br/>

                <TextField hintText='Descripción' floatingLabelText='Descripción'
                           onChange={this.setCategoryDescription.bind(this)}/>
                <br/>

                <h4>Items</h4>
                <Divider/>
                <FlatButton label='Agregar Item' primary={true} onTouchTap={this.setShowAddForm.bind(this)}/>

                {this.renderItems()}

                {this.state.showAddCard ? this.renderAddCard() : null}
            </div>
        );
    }

    //endregion

    //region Logic
    disableSaveButton = () => {
        return this.state.name === '';
    };

    setCategoryName = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    setCategoryDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    };

    setNewItem = (item) => {
        var oItems = this.state.items;
        oItems.push(item);

        this.setState({
            items: oItems
        });
    };

    setShowAddForm = () => {
        this.setState({
            showAddCard: !this.state.showAddCard
        });
    };

    setShowEditForm = () => {
        this.setState({

        })
    };

    deleteItem = (item) => {

    };

    renderItems = () => {
        if (this.state.items.length > 0) {
            return (
                <List children={
                    this.state.items.map(item => {
                        return <ListItem
                            key={item.id}
                            primaryText={item.name}
                            secondaryText={item.description + ' - Total: ' + item.total + ' - Disponible:' + item.available}
                            onTouchTap={}
                        />
                    })
                }/>
            );
        } else return <p>No se han agregado items a la categoría. Puedes agregarlos ahora mismo o más adelante.</p>
    };

    renderAddCard = () => {
        return <AddItemCard onAddClicked={this.setNewItem.bind(this)}
                            onCancelClicked={this.setShowAddForm.bind(this)}/>;
    };

    renderEditCard = (item) => {
        return <EditItemCard editItem={item} onEditClicked={} onCancelClicked={this.setShowEditForm.bind(this)}/>
    };
    //endregion
}

class AddItemCard extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            name: '',
            description: '',
            total: 0,
            available: 0
        };
    }

    render() {
        return (
            <Card>
                <CardHeader title='Agregar Nuevo Item'/>

                <TextField hintText='Nombre' floatingLabelText='Nombre' onChange={this.setName.bind(this)}/>
                <br/>

                <TextField hintText='Descripción' floatingLabelText='Descripción'
                           onChange={this.setDescription.bind(this)}/>
                <br/>

                <TextField hintText='Total' floatingLabelText='Total' onChange={this.setTotal.bind(this)}/>
                <br/>

                <TextField hintText='Disponible' floatingLabelText='Disponible'
                           onChange={this.setAvailable.bind(this)}/>
                <br/>

                <CardActions>
                    <FlatButton label='Agregar' primary={true} disabled={this.disableSaveButton()}
                                onTouchTap={this.onAddClicked.bind(this)}/>
                    <FlatButton label='Cancelar' onTouchTap={this.props.onCancelClicked.bind(this)}/>
                </CardActions>
            </Card>
        );
    }

    //endregion

    //region Logic
    setName = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    setDescription = (e) => {
        this.setState({
            description: e.target.value
        });
    };

    setTotal = (e) => {
        this.setState({
            total: e.target.value
        });
    };

    setAvailable = (e) => {
        this.setState({
            available: e.target.value
        });
    };

    disableSaveButton = () => {
        return this.state.name === '';
    };

    onAddClicked = () => {
        let item = {
            name: this.state.name,
            description: this.state.description,
            total: this.state.total !== '' ? this.state.total : 0,
            available: this.state.available !== '' ? this.state.available : 0
        };

        this.props.onAddClicked(item);
    };
    //endregion
}

class EditItemCard extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            name: '',
            description: '',
            total: 0,
            available: 0
        };
    }

    componentWillMount() {
        let item = this.props.editItem;

        this.setState({
            name: item.name,
            description: item.description,
            total: item.total,
            available: item.available
        })
    }

    render() {
        return (
            <Card>
                <CardHeader title='Editar Item'/>

                <TextField
                    hintText='Nombre'
                    floatingLabelText='Nombre'
                    onChange={this.setName.bind(this)}
                    value={this.state.name}
                />
                <br/>

                <TextField
                    hintText='Descripción'
                    floatingLabelText='Descripción'
                    onChange={this.setDescription.bind(this)}
                    value={this.state.description}
                />
                <br/>

                <TextField
                    hintText='Total'
                    floatingLabelText='Total'
                    onChange={this.setTotal.bind(this)}
                    value={this.state.total}
                />
                <br/>

                <TextField
                    hintText='Disponible'
                    floatingLabelText='Disponible'
                    onChange={this.setAvailable.bind(this)}
                    value={this.state.available}
                />
                <br/>

                <CardActions>
                    <FlatButton label='Guardar' primary={true} disabled={this.disableSaveButton()}
                                onTouchTap={this.onEditClicked.bind(this)}/>
                    <FlatButton label='Cancelar' onTouchTap={this.props.onCancelClicked.bind(this)}/>
                </CardActions>
            </Card>
        );
    }

    //endregion

    //region Logic
    setName = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    setDescription = (e) => {
        this.setState({
            description: e.target.value
        });
    };

    setTotal = (e) => {
        this.setState({
            total: e.target.value
        });
    };

    setAvailable = (e) => {
        this.setState({
            available: e.target.value
        });
    };

    disableSaveButton = () => {
        return this.state.name === '';
    };

    onEditClicked = () => {
        let item = {
            name: this.state.name,
            description: this.state.description,
            total: this.state.total !== '' ? this.state.total : 0,
            available: this.state.available !== '' ? this.state.available : 0
        };

        this.props.onEditClicked(item);
    };
    //endregion
}