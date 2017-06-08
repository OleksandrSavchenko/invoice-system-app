import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { invoicesFetching } from '../../actions/invoicesActions';

class Invoices extends Component {
    componentDidMount() {
        this.props.invoicesFetching();
    }

    render() {
        return (
            <div className="container container-invoices">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        browserHistory.push('/create-invoice');
                    }}
                    className="btn btn-primary"
                >
                    Create new invoice
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        invoices: state.invoices.data
    }
}

export default connect(mapStateToProps, { invoicesFetching })(Invoices);