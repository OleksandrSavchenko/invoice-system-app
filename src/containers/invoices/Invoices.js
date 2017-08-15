import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { invoicesFetching } from '../../actions/invoicesActions';

class Invoices extends Component {
    componentDidMount() {
        this.props.invoicesFetching();
    }

    invoicesList() {
        return this.props.invoices.map((invoice, i) => {
            return (
                <tr key={invoice.public_id}>
                    <th scope="row">{i + 1}</th>
                    <td>Invoice</td>
                    <td>{invoice.discount}%</td>
                    <td>${invoice.total}</td>
                    <td>
                        <button
                            className="btn btn-success"
                        >
                            Edit
                        </button>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            );
        })
    }

    render() {
        if (this.props.invoices.length === 0) {
            return null;
        }

        return (
            <div className="container">
                <h2>Invoices</h2>

                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Discount</th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.invoicesList()}
                    </tbody>
                </table>

                <button
                    onClick={() => browserHistory.push('/create-invoice')}
                    style={{width: '80%', margin: '0 auto', display: 'block'}}
                    className="btn btn-lg btn-primary"
                >
                    Create new invoice
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        invoices: state.invoices
    }
}

export default connect(mapStateToProps, { invoicesFetching })(Invoices);