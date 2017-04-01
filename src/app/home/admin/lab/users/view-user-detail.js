/**
 * Created by mgradob on 3/31/17.
 */
import React from "react";
import * as RefUtil from "../../../../utils/refrerences-util";
import AddToHistoryDialog from './dialog-add-to-history';
import CircularProgress from "material-ui/CircularProgress";
import Divider from "material-ui/Divider";
import {List, ListItem} from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";

export default class UserDetailView extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            labId: null,
            userInfo: null,
            showAddToHistory: false
        };
    }

    componentWillMount() {
        let labId = this.props.params.lab_id;
        let userUid = this.props.params.user_uid;

        this.setState({labId: labId});

        this.getUserInfo(labId, userUid);
    }

    render() {
        return this.renderUserDetail();
    }
    //endregion

    //region Logic
    toggleAddToHistoryDialog = () => this.setState({showAddToHistory: !this.state.showAddToHistory});

    renderUserDetail = () => {
        if(this.state.userInfo !== null)
            return(
                <div>
                    <h1>{this.state.userInfo.name}</h1>
                    <h3>{this.state.userInfo.id}</h3>
                    <p>Carrera: {this.state.userInfo.career}</p>
                    <br/>

                    <h3>Historial</h3>
                    <Divider/><br/>
                    <RaisedButton
                        label='Agregar al historial'
                        primary={true}
                        onTouchTap={this.toggleAddToHistoryDialog.bind(this)}
                    />
                    {this.renderUserHistory()}

                    {this.renderAddToHistoryDialog()}
                </div>
            );
        else return <CircularProgress />;
    };

    renderUserHistory = () => {
        if (this.state.userInfo.history !== undefined)
            return(
                <List children={
                    this.state.userInfo.history.map((historyItem) => {
                        let description = historyItem.name + " | " + historyItem.description;
                        let qtyStr = 'Cantidad: ' + historyItem.quantity;
                        let reqStr = ' | Pedido el ' + new Date(historyItem.date_requested).toString();
                        let delStr = historyItem.date_delivered !== undefined ? ' | Entregado el ' + historyItem.date_delivered : '';
                        let info = qtyStr + reqStr + delStr;

                        return <ListItem
                            primaryText={description}
                            secondaryText={info}
                            key={historyItem.uid}
                        />
                    })
                }/>
            );
        else return <p>El usuario no tiene historial.</p>
    };

    renderAddToHistoryDialog = () => {
        if (this.state.labId !== undefined)
            return (
                <AddToHistoryDialog labId={this.state.labId} open={this.state.showAddToHistory}
                                    onRequestClose={this.toggleAddToHistoryDialog.bind(this)}/>
            );
        else return null;
    };

    getUserInfo = (labId, userUid) => {
        RefUtil.getLabUserReference(labId, userUid)
            .on('value', snap => {
                console.log('Firebase', 'User', snap.val());
                let user = snap.val();
                let history = [];

                if (user.history !== undefined && user.history !== '') {
                    let historyKeys = Object.keys(user.history);

                    for (let i = 0; i < historyKeys.length; i++) {
                        let k = historyKeys[i];

                        let historyItem = {
                            name: user.history[k].name,
                            description: user.history[k].description,
                            quantity: user.history[k].quantity,
                            date_requested: user.history[k].date_requested,
                            date_delivered: user.history[k].date_delivered
                        };

                        history.push(historyItem);
                    }

                    user.history = history;
                }


                this.setState({userInfo: user});
            });
    };
    //endregion
}