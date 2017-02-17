/**
 * Created by mgradob on 2/16/17.
 */
import React from 'react';

import Snackbar from 'material-ui/Snackbar';

class BaseView extends React.Component {
    constructor() {
        super();

        this.state = {
            showAlert: false,
            alertMessage: null
        }
    }

    _showAlert = (message) => alert(message);
        // this.setState({showAlert: true, alertMessage: message});

    _handleAlertClose = () => this.setState({showAlert: false, alertMessage: null});
}

export default BaseView;