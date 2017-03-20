/**
 * Created by mgradob on 3/19/17.
 */
import React from "react";
import * as RefUtil from "../../../../utils/refrerences-util";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

export default class AddItemDialog extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            labId: null,
            categoryId: null,
            name: '',
            description: '',
            total: 0,
            available: 0
        };
    }

    componentWillMount() {
        let labId = this.props.labId;
        let categoryId = this.props.categoryId;

        this.setState({
            labId: labId,
            categoryId: categoryId
        });
    }

    render() {
        let actions = [
            <FlatButton
                label="Cancelar"
                onTouchTap={this.props.onRequestClose}
            />,
            <FlatButton
                label="Guardar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.saveItem.bind(this)}
                disabled={this.disableSaveButton()}
            />
        ];

        return (
            <Dialog
                title='Nuevo Item'
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                actions={actions}
            >
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
            </Dialog>
        );
    }
    //endregion

    //region Logic
    saveItem = () => {
        let newItemRef = RefUtil.getCategoryItemsReference(this.state.labId, this.state.categoryId).push();

        let newItemData = {
            id: newItemRef.key,
            name: this.state.name,
            description: this.state.description,
            total: this.state.total,
            available: this.state.available
        };

        newItemRef.set(newItemData)
            .then(() => this.props.onRequestClose())
            .catch(err => console.error('Firebase', 'Add item', err));
    };

    disableSaveButton = () => this.state.name === '';

    setName = e => this.setState({name: e.target.value});

    setDescription = e => this.setState({description: e.target.value});

    setTotal = e => this.setState({total: e.target.value});

    setAvailable = e => this.setState({available: e.target.value});
    //endregion
}