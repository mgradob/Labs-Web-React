/**
 * Created by mgradob on 3/19/17.
 */
import React from "react";
import * as RefUtil from "../../../../utils/refrerences-util";
import AddItemDialog from "./dialog-add-item";
import EditItemDialog from "./dialog-edit-item";
import {List, ListItem} from "material-ui/List";
import CircularProgress from "material-ui/CircularProgress";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";

export default class CategoryDetailView extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            labId: null,
            categoryId: null,
            categoryInfo: null,
            showAddItem: false,
            showEditItem: false,
            isEdited: false,
            editItem: null
        };
    }

    componentWillMount() {
        let labId = this.props.params.lab_id;
        let categoryId = this.props.params.category_id;

        this.setState({
            labId: labId,
            categoryId: categoryId
        });

        this.getCategoryInfo(labId, categoryId);
    }

    render() {
        return this.renderCategoryInfo();
    }

    renderCategoryInfo = () => {
        if (this.state.categoryInfo != null)
            return (
                <div>
                    <h1>{this.state.categoryInfo.name}</h1>

                    <TextField
                        hintText='Nombre'
                        floatingLabelText='Nombre'
                        value={this.state.categoryInfo.name}
                        onChange={this.setCategoryName.bind(this)}
                    />
                    <br/>

                    <TextField
                        hintText='Descripción'
                        floatingLabelText='Descripción'
                        value={this.state.categoryInfo.description}
                        onChange={this.setCategoryDescription.bind(this)}
                    />

                    {this.renderSaveButton()}
                    <br/>
                    <br/>

                    <h4>Items</h4>
                    <Divider/>
                    <br/>

                    <RaisedButton
                        label='Agregar Item'
                        primary={true}
                        onTouchTap={this.toggleAddItemDialog.bind(this)}
                    />

                    {this.renderItems()}

                    {this.renderAddItemDialog()}

                    {this.renderEditItemDialog()}

                    <FlatButton
                        label='Borrar Categoría'
                        primary={true}
                        onTouchTap={this.deleteCategory.bind(this)}
                    />
                </div>
            );
        else return <CircularProgress />;
    };

    renderSaveButton = () => {
        return this.state.isEdited ?
            <RaisedButton label='Guardar' primary={true}
                          onTouchTap={this.putCategoryDetail.bind(this)}/> : null;
    };

    renderItems = () => {
        if (this.state.categoryInfo.items != null)
            return (
                <List children={
                    this.state.categoryInfo.items.map(item => {
                        return <ListItem
                            key={item.id}
                            primaryText={item.name}
                            secondaryText={item.description + ' | Total: ' + item.total + ' | Disponible: ' + item.available}
                            onTouchTap={this.toggleEditItemDialog.bind(this, item)}
                        />
                    })
                }/>
            );
        else return <p>No hay items en la categoría todavía.</p>
    };

    renderAddItemDialog = () => {
        if (this.state.labId != null && this.state.categoryId != null)
            return (
                <AddItemDialog labId={this.state.labId} categoryId={this.state.categoryId} open={this.state.showAddItem}
                               onRequestClose={this.toggleAddItemDialog.bind(this)}/>
            );
        else return null;
    };

    renderEditItemDialog = () => {
        if (this.state.labId != null && this.state.categoryId != null && this.state.editItem != null)
            return (
                <EditItemDialog labId={this.state.labId} categoryId={this.state.categoryId} item={this.state.editItem}
                                open={this.state.showEditItem}
                                onRequestClose={this.toggleEditItemDialog.bind(this)}/>
            );
        else return null;
    };
    //endregion

    //region Logic
    putCategoryDetail = () => {
        let categoryRef = RefUtil.getCategoryReference(this.state.labId, this.state.categoryId);

        categoryRef.set(this.state.categoryInfo)
            .then(() => this.setState({isEdited: false}))
            .catch(err => console.error('Firebase', 'Update category', err));
    };

    deleteCategory = () => {
        let categoryRef = RefUtil.getCategoryReference(this.state.labId, this.state.categoryId);

        let urlPath = this.props.location.pathname;
        let removePath = urlPath.substr(urlPath.lastIndexOf('/'));
        urlPath = urlPath.replace(new RegExp(removePath), '');

        categoryRef.remove()
            .then(() => this.props.router.replace(urlPath))
            .catch(err => console.error('Firebase', 'Delete category', err));
    };

    toggleAddItemDialog = () => this.setState({
        showAddItem: !this.state.showAddItem,
        showEditItem: false
    });

    toggleEditItemDialog = (item) => this.setState({
        showAddItem: false,
        showEditItem: !this.state.showEditItem,
        editItem: item
    });

    setCategoryName = (e) => {
        let newCategoryInfo = this.state.categoryInfo;

        newCategoryInfo.name = e.target.value;

        this.setState({
            categoryInfo: newCategoryInfo,
            isEdited: true
        });
    };

    setCategoryDescription = (e) => {
        let newCategoryInfo = this.state.categoryInfo;

        newCategoryInfo.description = e.target.value;

        this.setState({
            categoryInfo: newCategoryInfo,
            isEdited: true
        });
    };

    getCategoryInfo = (labId, categoryId) => {
        RefUtil.getCategoryReference(labId, categoryId)
            .on('value', snap => {
                console.log('Firebase', 'Category detail', snap.val());
                let categoryInfo = snap.val();
                let categoryItems = [];

                if (categoryInfo.items != null && categoryInfo.items !== '') {
                    let itemKeys = Object.keys(categoryInfo.items);

                    for (let i = 0; i < itemKeys.length; i++) {
                        let k = itemKeys[i];

                        let item = {
                            id: categoryInfo.items[k].id,
                            name: categoryInfo.items[k].name,
                            description: categoryInfo.items[k].description,
                            total: categoryInfo.items[k].total,
                            available: categoryInfo.items[k].available
                        };

                        categoryItems.push(item);
                    }

                    categoryInfo.items = categoryItems;
                }

                this.setState({categoryInfo: categoryInfo});
            })
    };
    //endregion
}