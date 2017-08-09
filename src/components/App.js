import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Header from './Header';
import LoadingContainer from '../containers/LoadingContainer';

class App extends Component {
    componentDidMount() {
        const currentLocation = browserHistory.getCurrentLocation().pathname;
        if (!this.props.isAuthenticated && (currentLocation !== '/login' || currentLocation !== '/registration')) {
            browserHistory.push('/login');
        }
    }

    render() {
        return (
            <div className="wrapper">
                <Header isAuthenticated={this.props.isAuthenticated}/>
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

export default connect(mapStateToProps)(App);