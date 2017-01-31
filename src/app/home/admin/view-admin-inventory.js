/**
 * Created by mgradob on 1/30/17.
 */
import React from 'react';

import Axios from 'axios';
import Constants from '../../constants';

import AuthenticatedView from '../../base/view-base-authenticated';

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
        return (
            <div>
                {this._formatInventory()}
            </div>
        )
    }

    //endregion

    //region Logic
    _formatInventory = () => {
        let categoriesList;
        if (this.state.categories.length > 0)
            categoriesList = <List children={
                this.state.categories.map((category) => {
                    return <CategoryListItem category={category} key={this.state.categories.indexOf(category)} onCategoryClicked={this._onCategoryClicked.bind(this)}/>;
                })
            }/>;
        else categoriesList = <p>No hay categorias por el momento.</p>;

        return categoriesList;
    };

    _onCategoryClicked = (category) => {
        console.log('AdminHomeDashboard', 'Clicked', category);
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
        return (
            <ListItem
                primaryText={this.state.category.name}
                onTouchTap={this._onCategoryClicked.bind(this)}/>
        )
    }

    //endregion

    //region Logic
    _onCategoryClicked = () => {
        this.props._onCategoryClicked(this.state.category);
    };
    //endregion
}