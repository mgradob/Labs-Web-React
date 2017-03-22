/**
 * Created by mgradob on 3/19/17.
 */
import React from "react";
import * as RefUtil from "../../../../utils/refrerences-util";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

export default class AddCategoryDialog extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            labId: null,
            name: '',
            description: ''
        };
    }

    componentWillMount() {
        let labId = this.props.labId;

        this.setState({labId: labId});
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
                onTouchTap={this.saveCategory.bind(this)}
                disabled={this.disableSaveButton()}
            />
        ];

        return (
            <Dialog
                title='Nueva Categoría'
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                actions={actions}
            >
                <TextField hintText='Nombre' floatingLabelText='Nombre' onChange={this.setCategoryName.bind(this)}/>
                <br/>

                <TextField hintText='Descripción' floatingLabelText='Descripción'
                           onChange={this.setCategoryDescription.bind(this)}/>
                <br/>
            </Dialog>
        );
    }

    //endregion

    //region Logic
    saveCategory = () => {
        let newCategoryRef = RefUtil.getLabCategoriesReference(this.state.labId).push();

        let newCategoryData = {
            name: this.state.name,
            description: this.state.description,
            id: newCategoryRef.key
        };

        newCategoryRef.set(newCategoryData)
            .then(() => this.props.onRequestClose())
            .catch(err => console.error('Firebase', 'Add category', err));
    };

    disableSaveButton = () => this.state.name === '';

    setCategoryName = e => this.setState({name: e.target.value});

    setCategoryDescription = e => this.setState({description: e.target.value});
    //endregion
}