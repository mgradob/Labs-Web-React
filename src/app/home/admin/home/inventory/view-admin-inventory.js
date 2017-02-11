/**
 * Created by mgradob on 1/30/17.
 */
import React from 'react';
import {Link} from 'react-router';

import Axios from 'axios';
import Constants from '../../../../constants';

import AuthenticatedView from '../../../../base/view-base-authenticated';

import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

export default class AdminInventoryView extends AuthenticatedView {
    //region Component
    componentWillMount() {
        this.setState({
            categories: [],
        });

        this._getCategories();
    }

    render() {
        let addUrl = `/admin/home/inventory/add`;

        return (
            <div>
                <RaisedButton
                    label="Agregar Categoría"
                    primary={true}
                    containerElement={<Link to={addUrl}/>}/>

                {this._renderCategories()}
            </div>
        )
    }
    //endregion

    //region Logic
    _renderCategories = () => {
        let categoriesList;
        if (this.state.categories.length > 0)
            categoriesList = <List children={
                this.state.categories.map((category) => {
                    return <CategoryListItem category={category} key={this.state.categories.indexOf(category)} location={this.props.location}/>;
                })
            }/>;
        else categoriesList = <p>No hay categorias por el momento.</p>;

        return categoriesList;
    };
    //endregion

    //region Services
    _getCategories = () => {
        this.setState({
            showProgress: true
        });

        let url = Constants.BASE_URL + '/inventory/' + this.state.lab.id;

        Axios.get(url, {
            headers: {
                "Authorization": this.state.token
            },
            params: {
                id_user: this.state.user.id_user
            }
        }).then((response) => {
            console.log('Admin Home Inventory', 'Get Inventory', response.data);

            let data = response.data.data;

            this.setState({
                showProgress: false,
                categories: data
            });
        }).catch((error) => {
            console.error('Admin Home Inventory', 'Get Inventory', error);

            this.setState({
                showProgress: false
            });
        });
    };
    //endregion
}

class CategoryListItem extends React.Component {
    //region Component
    componentWillMount() {
        this.setState({
            category: this.props.category
        });
    }

    render() {
        let url = '/admin/home/inventory/' + this.state.category.id;

        return (
            <ListItem
                primaryText={this.state.category.name}
                containerElement={<Link to={url}/>}
            />
        )
    }

    //endregion
}