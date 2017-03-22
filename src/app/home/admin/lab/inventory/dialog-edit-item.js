/**
 * Created by mgradob on 3/19/17.
 */
import React from "react";
import * as RefUtil from "../../../../utils/refrerences-util";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

export default class EditItemDialog extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            labId: null,
            categoryId: null,
            item: null
        };
    }

    componentWillMount() {
        let labId = this.props.labId;
        let categoryId = this.props.categoryId;
        let item = this.props.item;

        this.setState({
            labId: labId,
            categoryId: categoryId,
            item: item
        });
    }

    render() {
        let actions = [
            <FlatButton
                label="Cancelar"
                onTouchTap={this.props.onRequestClose}
            />,
            <FlatButton
                label="Borrar"
                keyboardFocused={true}
                onTouchTap={this.deleteItem.bind(this)}
            />,
            <FlatButton
                label="Guardar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.updateItem.bind(this)}
                disabled={this.disableSaveButton()}
            />
        ];

        return (
            <div>
                {this.renderEditDialog(actions)}
            </div>
        );
    }

    renderEditDialog = (actions) => {
        if (this.state.item != null)
            return (
                <Dialog
                    title='Editar Item'
                    open={this.props.open}
                    onRequestClose={this.props.onRequestClose}
                    actions={actions}
                >
                    <TextField hintText='Nombre' floatingLabelText='Nombre' onChange={this.setName.bind(this)}
                               value={this.state.item.name}/>
                    <br/>

                    <TextField hintText='Descripción' floatingLabelText='Descripción'
                               onChange={this.setDescription.bind(this)} value={this.state.item.description}/>
                    <br/>

                    <TextField hintText='Total' floatingLabelText='Total' onChange={this.setTotal.bind(this)}
                               value={this.state.item.total}/>
                    <br/>

                    <TextField hintText='Disponible' floatingLabelText='Disponible'
                               onChange={this.setAvailable.bind(this)} value={this.state.item.available}/>
                    <br/>
                </Dialog>
            );
        else return null;
    };
    //endregion

    //region Logic
    deleteItem = () => {
        let itemRef = RefUtil.getItemReference(this.state.labId, this.state.categoryId, this.state.item.id);

        itemRef.remove()
            .then(() => this.props.onRequestClose())
            .catch(err => console.error('Firebase', 'Delete item', err));
    };

    updateItem = () => {
        let itemRef = RefUtil.getItemReference(this.state.labId, this.state.categoryId, this.state.item.id);

        itemRef.set(this.state.item)
            .then(() => this.props.onRequestClose())
            .catch(err => console.error('Firebase', 'Update item', err));
    };

    disableSaveButton = () => this.state.name === '';

    setName = e => {
        let tempItem = this.state.item;
        tempItem.name = e.target.value;

        this.setState({item: tempItem});
    };

    setDescription = e => {
        let tempItem = this.state.item;
        tempItem.description = e.target.value;

        this.setState({item: tempItem});
    };

    setTotal = e => {
        let tempItem = this.state.item;
        tempItem.total = e.target.value;

        this.setState({item: tempItem});
    };

    setAvailable = e => {
        let tempItem = this.state.item;
        tempItem.available = e.target.value;

        this.setState({item: tempItem});
    };
    //endregion
}