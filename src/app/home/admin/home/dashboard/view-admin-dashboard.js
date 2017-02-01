/**
 * Created by mgradob on 1/23/17.
 */
import React from 'react';

import Axios from 'axios';
import Constants from '../../../../constants';

import AuthenticatedView from '../../../../base/view-base-authenticated';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

export default class AdminDashboardView extends AuthenticatedView {
    //region Component
    componentWillMount() {
        this.setState({
            carts: [],
            newUsers: [],
            categories: [],
            users: []
        });

        this._getHome();
    }

    render() {
        const style = {
            display: 'flex',
            flexWrap: 'wrap'
        };

        return (
            <div>
                <p>Bienvenido al laboratorio de {this.state.lab.name}, {this.state.user.full_name.split(' ')[0]}.</p>
                <br/>

                <h2>Pedidos</h2>
                <Divider/>
                {this._formatCarts()}
                <br/>

                <h2>Nuevos Usuarios</h2>
                <Divider/>
                {this._formatNewUsers()}
                <br/>

                <h2>Inventario</h2>
                <Divider/>
                <br/>
                <div style={style}>
                    {this._formatInventory()}
                </div>
                <br/>

                <h2>Usuarios</h2>
                <Divider/>
                {this._formatUsers()}
            </div>
        );
    }
    //endregion

    //region Logic
    _formatCarts = () => {
        let requestsList;
        if (this.state.carts.length > 0)
            requestsList = <List children={
                this.state.carts.map((cart) => {
                    return <CartListItem cart={cart} key={this.state.carts.indexOf(cart)} onCartClicked={this._onCartClicked.bind(this)}/>;
                })
            }/>;
        else requestsList = <p>No hay nuevos pedidos por el momento.</p>;

        return requestsList;
    };

    _formatNewUsers = () => {
        let newUsersList;
        if (this.state.newUsers.length > 0)
            newUsersList = <List children={
                this.state.newUsers.map((newUser) => {
                    return <NewUserListItem newUser={newUser} key={this.state.newUsers.indexOf(newUser)} onNewUserClicked={this._onNewUserClicked.bind(this)}/>;
                })
            }/>;
        else newUsersList = <p>No hay nuevos usuarios por el momento.</p>;

        return newUsersList;
    };

    _formatInventory = () => {
        let categoriesList;
        if (this.state.categories.length > 0)
            categoriesList = this.state.categories.map((category) => {
                return <CategoryListItem category={category} key={this.state.categories.indexOf(category)} onCategoryClicked={this._onCategoryClicked.bind(this)}/>;
            });
        else categoriesList = <p>No hay categorias por el momento.</p>;

        return categoriesList;
    };

    _formatUsers = () => {
        let usersList;
        if (this.state.users.length > 0)
            usersList = <List children={
                this.state.users.map((user) => {
                    return <UserListItem user={user} key={this.state.users.indexOf(user)} onUserClicked={this._onUserClicked.bind(this)}/>;
                })
            }/>;
        else usersList = <p>No hay nuevos usuarios por el momento.</p>;

        return usersList;
    };

    _onCartClicked = (cart) => {
        console.log('AdminHomeDashboard', 'Clicked', cart);
    };

    _onNewUserClicked = (newUser) => {
        console.log('AdminHomeDashboard', 'Clicked', newUser);
    };

    _onCategoryClicked = (category) => {
        console.log('AdminHomeDashboard', 'Clicked', category);
    };

    _onUserClicked = (user) => {
        console.log('AdminHomeDashboard', 'Clicked', user);
    };
    //endregion

    //region Services
    _getHome = () => {
        this.setState({
            showProgress: true
        });

        let url = Constants.BASE_URL + '/home/' + this.state.user.id_user;

        Axios.get(url, {
            headers: {
                "Authorization":this.state.token
            },
            params: {
                lab_id: this.state.lab.id
            }
        }).then((response) => {
            console.log('Admin Home Dashboard', 'Get Home', response.data);

            let data = response.data.data;

            this.setState({
                showProgress: false,
                carts: data.requests,
                newUsers: data.signUpRequests,
                categories: data.categories,
                users: data.users
            });
        }).catch((error) => {
            console.error('Admin Home Dashboard', 'Get Home', error);

            this.setState({
                showProgress: false
            });
        });
    };
    //endregion
}

class CartListItem extends React.Component {
    //region Component
    componentWillMount() {
        this.setState({
            cart: this.props.cart
        });
    }

    render() {
        return(
            <ListItem
                primaryText={this.state.cart.student_name}
                secondaryText={this.state.cart.student_id + '\n' + this.state.cart.date_requested}
                onTouchTap={this._onCartClicked.bind(this)}
            />
        )
    }
    //endregion

    //region Logic
    _onCartClicked = () => {
        this.props._onCartClicked(this.state.cart);
    };
    //endregion
}

class NewUserListItem extends React.Component {
    //region Component
    componentWillMount() {
        this.setState({
            newUser: this.props.newUser
        });
    }

    render() {
        return(
            <ListItem
                primaryText={this.state.newUser.user_name}
                secondaryText={this.state.newUser.user_id}
                onTouchTap={this._onNewUserClicked.bind(this)}
            />
        )
    }
    //endregion

    //region Logic
    _onNewUserClicked = () => {
        this.props._onNewUserClicked(this.state.newUser);
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
        return(
            <Chip onTouchTap={this._onCategoryClicked.bind(this)}>
                {this.state.category}
            </Chip>
        )
    }
    //endregion

    //region Logic
    _onCategoryClicked = () => {
        this.props._onCategoryClicked(this.state.category);
    };
    //endregion
}

class UserListItem extends React.Component {
    //region Component
    componentWillMount() {
        this.setState({
            user: this.props.user
        });
    }

    render() {
        return(
            <ListItem
                primaryText={this.state.user.full_name}
                secondaryText={this.state.user.id_user}
                onTouchTap={this._onUserClicked.bind(this)}
            />
        )
    }
    //endregion

    //region Logic
    _onUserClicked = () => {
        this.props._onUserClicked(this.state.user);
    };
    //endregion
}