/**
 * Created by mgradob on 3/11/17.
 */
import React from "react";
import {Link} from "react-router";
import * as Firebase from "firebase";
import {List, ListItem} from "material-ui/List";
import CircularProgress from "material-ui/CircularProgress";
import RaisedButton from "material-ui/RaisedButton";
import Divider from 'material-ui/Divider'

export default class LabInfoView extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            labId: null,
            labInfo: null
        };

        this.labsRef = Firebase.database().ref().child('labs');
    }

    componentWillMount() {
        this.getLabInfo(this.props.params.lab_id);
    }

    render() {
        return (
            <div>
                {this.renderLabInfo()}
            </div>
        );
    }

    renderLabInfo = () => {
        if (this.state.labInfo != null)
            return (
                <div>
                    <h1>{this.state.labInfo.name}</h1>
                    <h3>Campus {this.state.labInfo.campus}</h3>
                    <h4>Items</h4>
                    <Divider/>

                    {this.renderCategories()}

                    <RaisedButton
                        label='Agregar Categoría'
                        primary={true}
                        containerElement={<Link to={this.props.location.pathname + '/add'}/>}
                    />
                </div>
            );
        else return <CircularProgress/>;
    };

    renderCategories = () => {
        if (this.state.labInfo.categories != null)
            return (
                <List children={
                    this.state.labInfo.categories.map(category => {
                        return <ListItem
                            primaryText={category.name}
                            secondaryText={category.description}
                            key={category.id}
                            containerElement={<Link to={this.props.location.pathname + '/' + category.id}/>}
                        />
                    })
                }/>
            );
        else
            return (
                <p>No hay categorias todavía.</p>
            );
    };
    //endregion

    //region Logic
    getLabInfo = (labId) => {
        this.labsRef.child(labId)
            .on('value', snap => {
                console.log('Firebase', 'Lab info', snap.val());

                this.setState({
                    labId: labId,
                    labInfo: snap.val()
                });
            });
    };
    //endregion
}