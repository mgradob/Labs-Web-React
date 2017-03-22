/**
 * Created by mgradob on 3/11/17.
 */
import React from "react";
import {Link} from "react-router";
import * as RefUtil from "../../../utils/refrerences-util";
import AddCategoryDialog from "./inventory/dialog-add-category";
import {List, ListItem} from "material-ui/List";
import CircularProgress from "material-ui/CircularProgress";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";

export default class LabInfoView extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            labId: null,
            labInfo: null,
            showAddCategory: false
        };
    }

    componentWillMount() {
        let labId = this.props.params.lab_id;

        this.setState({labId: labId});

        this.getLabInfo(labId);
    }

    render() {
        return this.renderLabInfo();
    }

    renderLabInfo = () => {
        if (this.state.labInfo != null)
            return (
                <div>
                    <h1>{this.state.labInfo.name}</h1>

                    <h3>Campus {this.state.labInfo.campus}</h3>
                    <br/>

                    <h4>Items</h4>
                    <Divider/>
                    <br/>

                    <RaisedButton
                        label='Agregar Categoría'
                        primary={true}
                        onTouchTap={this.toggleAddCategoryDialog.bind(this)}
                    />

                    {this.renderCategories()}

                    {this.renderAddCategoryDialog()}
                </div>
            );
        else return <CircularProgress/>;
    };

    renderCategories = () => {
        if (this.state.labInfo.categories != null)
            return (
                <List children={
                    this.state.labInfo.categories.map((category) => {
                        return <ListItem
                            primaryText={category.name}
                            secondaryText={category.description}
                            key={category.id}
                            containerElement={<Link to={this.props.location.pathname + '/' + category.id}/>}
                        />
                    })
                }/>
            );
        else return <p>No hay categorias todavía.</p>;
    };

    renderAddCategoryDialog = () => {
        if (this.state.labId != null)
            return (
                <AddCategoryDialog labId={this.state.labId} open={this.state.showAddCategory}
                                   onRequestClose={this.toggleAddCategoryDialog.bind(this)}/>
            );
        else return null;
    };
    //endregion

    //region Logic
    toggleAddCategoryDialog = () => this.setState({showAddCategory: !this.state.showAddCategory});

    getLabInfo = (labId) => {
        RefUtil.getLabReference(labId)
            .on('value', snap => {
                let labInfo = snap.val();
                let labCategories = [];

                if (labInfo.categories != null && labInfo.categories !== '') {
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

                    labInfo.categories = labCategories;
                }

                this.setState({labInfo: labInfo});
            });
    };
    //endregion
}