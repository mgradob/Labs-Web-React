/**
 * Created by mgradob on 3/11/17.
 */
import React from 'react'

export default class AdminContainerView extends React.Component {
    //region Component
    render() {
        return(
          <div className="container">
              {this.props.children}
          </div>
        );
    }
    //endregion
}