import React from 'react';
import { connect } from 'react-redux';

function LoadingContainer(props) {
    return (
        <div className={props.loading ? "container container-loading active" : "container container-loading"}>
            <div className="loading-block">
                <div className="dot"/>
                <div className="dot"/>
                <div className="dot"/>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        loading: state.loading.status
    }
}

export default connect(mapStateToProps)(LoadingContainer);