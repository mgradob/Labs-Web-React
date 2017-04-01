/**
 * Created by mgradob on 3/31/17.
 */
import React from "react";
import * as RefUtil from "../../../../utils/refrerences-util";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from "material-ui/CircularProgress";

export default class AddToHistoryDialog extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            labId: null,
            category: null,
            categories: [],
            itemToAdd: null,
            items: []
        }
    }

    componentWillMount() {
        let labId = this.props.labId;

        this.getCategories(labId);

        this.setState({labId: labId});
    }

    render() {
        let actions = [
            <FlatButton
                label="Cancelar"
                onTouchTap={this.props.onRequestClose}
            />,
            <FlatButton
                label="Agregar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.addItem.bind(this)}
                disabled={this.disableAddButton()}
            />
        ];

        return(
            <Dialog
                title='Agregar item al usuario'
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                actions={actions}
            >
                {this.renderCategories()}

                {this.renderItems()}
            </Dialog>
        );
    }
    //endregion

    //region Logic
    renderCategories = () => {
        if (this.state.categories.length > 0) {
            let categories = this.state.categories.map(category => {
                return <MenuItem key={category.id} value={category} primaryText={category.name}/>
            });

            return (
                <SelectField
                    floatingLabelText='Categoría'
                    value={this.state.category.name}
                    onChange={this.onCategorySelected.bind(this)}
                >{categories}</SelectField>
            );
        } else return <CircularProgress/>;
    };

    onCategorySelected = (event, index, value) => {
        this.getItems(value);
        this.setState({category: value});
    };

    renderItems = () => {
        if (this.state.items.length > 0) {
            let items = this.state.items.map(item => {
                return <MenuItem key={item.id} value={item} primaryText={item.name}/>
            });

            return (
                <SelectField
                    floatingLabelText='Categoría'
                    value={this.state.itemToAdd.name}
                    onChange={this.onCategorySelected.bind(this)}
                >{items}</SelectField>
            );
        } else return <CircularProgress/>;
    };

    onItemSelected = (event, index, value) => {
        this.setState({itemToAdd: value});
    };

    getCategories = (labId) => {
        RefUtil.getLabCategoriesReference(labId)
            .on('value', snap => {
                console.log('Firebase', 'Add to history', 'Categories', snap.val());

                let labInfo = snap.val();
                let labCategories = [];

                if (labInfo.categories !== undefined && labInfo.categories !== '') {
                    let catKeys = Object.keys(labInfo.categories);

                    for (let i = 0; i < catKeys.length; i++) {
                        let k = catKeys[i];

                        let category = {
                            id: labInfo.categories[k].id,
                            name: labInfo.categories[k].name,
                            description: labInfo.categories[k].description
                        };

                        labCategories.push(category);
                    }
                }

                this.setState({categories: labCategories});
            });
    };

    getItems = () => {
        RefUtil.getCategoryItemsReference(this.state.labId, this.state.category.id)
            .on('value', snap => {
                console.log('Firebase', 'Add to history', 'Items', snap.val());

                let labInfo = snap.val();
                let labItems = [];

                if (labInfo.items !== undefined && labInfo.items !== '') {
                    let catKeys = Object.keys(labInfo.items);

                    for (let i = 0; i < catKeys.length; i++) {
                        let k = catKeys[i];

                        let category = {
                            id: labInfo.items[k].id,
                            name: labInfo.items[k].name,
                            description: labInfo.items[k].description
                        };

                        labItems.push(category);
                    }
                }

                this.setState({items: labItems});
            });
    };

    addItem = () => {
        // let newItemRef = RefUtil.getCategoryItemsReference(this.state.labId, this.state.categoryId).push();
        //
        // let newItemData = {
        //     id: newItemRef.key,
        //     name: this.state.name,
        //     description: this.state.description,
        //     total: this.state.total,
        //     available: this.state.available
        // };
        //
        // newItemRef.set(newItemData)
        //     .then(() => this.props.onRequestClose())
        //     .catch(err => console.error('Firebase', 'Add item', err));
    };

    disableAddButton = () => this.state.itemToAdd === null;
    //endregion
}