/**
 * Created by mgradob on 1/31/17.
 */
import React from "react";
import {Link} from "react-router";
import Axios from "axios";
import Constants from "../../../../constants";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {List, ListItem} from "material-ui/List";

export default class AdminInventoryDetailView extends React.Component {
    //region Component
    constructor() {
        super();

        this.setState({
            showProgress: false,
            category: null,
            showAddForm: false,
            showEditForm: false
        });

        this._getCategory();
    }

    render() {
        let addUrl = `/admin/home/inventory/${this.props.params.category_id}/add`;

        if (this.state.category === null) return <div></div>;
        return (
            <div>
                <TextField
                    value={this.state.category.name}
                    floatingLabelText="Nombre"
                    onChange={this._setCategoryName.bind(this)}
                />
                <br/>

                <h3>Items</h3>
                <RaisedButton
                    label="Agregar Item"
                    primary={true}
                    containerElement={<Link to={addUrl}/>}
                />
                <br/>

                {this._formatItems()}
            </div>
        );
    }

    //endregion

    //region Logic
    _setCategoryName = (e) => {
        let tempCat = this.state.category;
        tempCat.name = e.target.value;

        this.setState({
            category: tempCat
        });
    };

    _formatItems = () => {
        let itemsList;
        if (this.state.category.items.length > 0)
            itemsList = <List children={
                this.state.category.items.map((item, index) => {
                    return <ItemListItem category={this.state.category} item={item} key={index}/>;
                })
            }/>;
        else itemsList = <p>No hay items por el momento.</p>;

        return itemsList;
    };
    //endregion

    //region Services
    _getCategory = () => {
        this.setState({
            showProgress: true
        });

        let url = `${Constants.BASE_URL}/inventory/${this.state.lab.id}/${this.props.params.category_id}`;

        Axios.get(url, {
            headers: {
                "Authorization": this.state.token
            },
            params: {
                id_user: this.state.user.id_user
            }
        }).then((response) => {
            console.log('Admin Home Inventory', 'Get Category', response.data);

            let data = response.data.data;

            this.setState({
                showProgress: false,
                category: data
            });
        }).catch((error) => {
            console.error('Admin Home Inventory', 'Get Category', error);

            this.setState({
                showProgress: false
            });
        });
    };
    //endregion
}

class ItemListItem extends React.Component {
    //region Component
    componentWillMount() {
        this.setState({
            item: this.props.item,
            category: this.props.category
        });
    }

    render() {
        let url = `/admin/home/inventory/${this.state.category.id}/edit/${this.state.item.id}`;

        return (
            <ListItem
                primaryText={this.state.item.name + ' | ' + this.state.item.note}
                secondaryText={'Disponible: ' + this.state.item.available + ' | Total: ' + this.state.item.total}
                containerElement={<Link to={url}/>}
            />
        )
    }

    //endregion
}