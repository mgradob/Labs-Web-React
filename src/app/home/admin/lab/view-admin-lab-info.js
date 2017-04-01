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
        if (this.state.labInfo !== null)
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
                    <br/>

                    <h4>Nuevos usuarios</h4>
                    <Divider/>
                    {this.renderNewUsers()}
                    <br/>

                    <h4>Usuarios</h4>
                    <Divider/>
                    {this.renderUsers()}

                    {this.renderAddCategoryDialog()}
                </div>
            );
        else return <CircularProgress/>;
    };

    renderCategories = () => {
        if (this.state.labInfo.categories !== undefined)
            return (
                <List children={
                    this.state.labInfo.categories.map((category) => {
                        return <ListItem
                            primaryText={category.name}
                            secondaryText={category.description}
                            key={category.id}
                            containerElement={<Link to={this.props.location.pathname + '/category/' + category.id}/>}
                        />
                    })
                }/>
            );
        else return <p>No hay categorias todavía.</p>;
    };

    renderAddCategoryDialog = () => {
        if (this.state.labId !== undefined)
            return (
                <AddCategoryDialog labId={this.state.labId} open={this.state.showAddCategory}
                                   onRequestClose={this.toggleAddCategoryDialog.bind(this)}/>
            );
        else return null;
    };

    renderNewUsers = () => {
        if (this.state.labInfo.new_users !== undefined)
            return (
                <List children={
                    this.state.labInfo.new_users.map((user) => {
                        return <ListItem
                            primaryText={user.name}
                            secondaryText={user.id}
                            key={user.uid}
                            containerElement={<Link to={this.props.location.pathname + '/new-user/' + user.uid}/>}
                        />
                    })
                }/>
            );
        else return <p>No hay nuevos usuarios.</p>;
    };

    renderUsers = () => {
        if (this.state.labInfo.users !== undefined)
            return (
                <List children={
                    this.state.labInfo.users.map((user) => {
                        return <ListItem
                            primaryText={user.name}
                            secondaryText={user.id}
                            key={user.uid}
                            containerElement={<Link to={this.props.location.pathname + '/user/' + user.uid}/>}
                        />
                    })
                }/>
            );
        else return <p>No hay usuarios por el momento.</p>;
    };
    //endregion

    //region Logic
    toggleAddCategoryDialog = () => this.setState({showAddCategory: !this.state.showAddCategory});

    getLabInfo = (labId) => {
        RefUtil.getLabReference(labId)
            .on('value', snap => {
                let labInfo = snap.val();
                let labCategories = [];
                let newUsers = [];
                let users = [];

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

                    labInfo.categories = labCategories;
                }

                if (labInfo.new_users !== undefined && labInfo.new_users !== '') {
                    let newUsersKeys = Object.keys(labInfo.new_users);

                    for (let i = 0; i < newUsersKeys.length; i++) {
                        let k = newUsersKeys[i];

                        let user = {
                            id: labInfo.new_users[k].id,
                            uid: labInfo.new_users[k].uid,
                            name: labInfo.new_users[k].name,
                            date: labInfo.new_users[k].date
                        };

                        newUsers.push(user);
                    }

                    labInfo.new_users = newUsers;
                }

                if (labInfo.users !== undefined && labInfo.users !== '') {
                    let usersKeys = Object.keys(labInfo.users);

                    for (let i = 0; i < usersKeys.length; i++) {
                        let k = usersKeys[i];

                        let user = {
                            id: labInfo.users[k].id,
                            uid: labInfo.users[k].uid,
                            name: labInfo.users[k].name,
                            date: labInfo.users[k].date
                        };

                        users.push(user);
                    }

                    labInfo.users = users;
                }

                this.setState({labInfo: labInfo});
            });
    };
    //endregion
}