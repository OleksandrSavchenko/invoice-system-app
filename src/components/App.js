import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Header from './Header';
import LoadingContainer from '../containers/LoadingContainer';

import { logout } from '../actions/authorizationActions';

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Header
                    isAuthenticated={this.props.isAuthenticated}
                    logout={this.props.logout}
                />
                <div className="content">
                    {this.props.children}
                </div>
                <LoadingContainer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authorization.isAuthenticated
    }
}

export default connect(mapStateToProps, { logout })(App);