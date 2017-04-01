/**
 * Created by mgradob on 3/11/17.
 */
import React from "react";
import * as RefUtil from "../../../../utils/refrerences-util";
import CircularProgress from "material-ui/CircularProgress";
import RaisedButton from "material-ui/RaisedButton";

export default class NewUserDetailView extends React.Component {
    //region Component
    constructor() {
        super();

        this.state = {
            labId: null,
            newUserInfo: null
        };
    }

    componentWillMount() {
        let labId = this.props.params.lab_id;
        let newUserUid = this.props.params.new_user_uid;

        this.setState({labId: labId});

        this.getNewUserInfo(labId, newUserUid);
    }

    render() {
        return this.renderNewUserDetail();
    }
    //endregion

    //region Logic
    renderNewUserDetail = () => {
        if(this.state.newUserInfo !== null)
            return(
                <div>
                    <h1>{this.state.newUserInfo.name}</h1>
                    <h3>{this.state.newUserInfo.id}</h3>
                    Fecha: {new Date(this.state.newUserInfo.date).toString()}
                    <br/>
                    <br/>
                    <RaisedButton primary={true} label='Aceptar' onTouchTap={this.acceptUser.bind(this)}/>
                </div>
            );
        else return <CircularProgress />;
    };

    getNewUserInfo = (labId, newUserUid) => {
        RefUtil.getNewUserReference(labId, newUserUid)
            .on('value', snap => {
                console.log('Firebase', 'New user', snap.val());

                this.setState({newUserInfo: snap.val()});
            });
    };

    acceptUser = () => {
        RefUtil.getLabReference(this.state.labId)
            .on('value', labSnap => {
                console.log('Firebase', 'New user detail', 'Lab', labSnap.val());
                let lab = labSnap.val();

                RefUtil.getUserReference(this.state.newUserInfo.uid).child('labs').child(lab.id)
                    .set({
                        id: lab.id,
                        name: lab.name
                    })
                    .then(() => console.log('Firebase', 'New user detail', 'Added to lab', lab.name))
                    .catch(err => console.error('Firebase', 'New user detail', err));

                RefUtil.getLabNewUserReference(this.state.labId, this.state.newUserInfo.uid)
                    .remove()
                    .then(() => console.log('Firebase', 'New user detail', 'Deleted from new users'))
                    .catch(err => console.error('Firebase', 'New user detail', err));
            });
    }
    //endregion
}