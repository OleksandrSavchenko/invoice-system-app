import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import {
    customersFetching,
    customerCreate,
    customerEdit,
    customerDelete
} from '../actions/customersActions';

class Customers extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            customer: {
                name: '',
                address: '',
                phone: ''
            },
            showModal: false,
            editMode: false
        };

        this.state = this.initialState;
    }

    componentDidMount() {
        this.props.customersFetching();
    }

    customersList() {
        return this.props.customers.map((customer, i) => {
            return (
                <tr key={customer.id + customer.name}>
                    <th scope="row">{i}</th>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                    <td>
                        <button
                            className="btn btn-success"
                            onClick={(e) => this.editCustomer(e, customer)}
                        >
                            Edit
                        </button>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={(e) => this.deleteCustomer(e, customer.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            );
        })
    }

    editCustomer(e, customer) {
        e.preventDefault();
        this.setState({
            customer: customer,
            showModal: true,
            editMode: true
        });
    }

    deleteCustomer(e, id) {
        e.preventDefault();
        this.props.customerDelete(id).then(() => {
            this.props.customersFetching();
        });
    }

    showModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    onChange(e, name) {
        let obj = { ...this.state.customer, [name]: e.target.value };
        this.setState({ customer: obj });
    }

    onSave(e) {
        e.preventDefault();
        if (!this.state.editMode) {
            this.props.customerCreate(this.state.customer).then(() => {
                this.props.customersFetching();
            });
        } else {
            this.props.customerEdit(this.state.customer).then(() => {
                this.props.customersFetching();
            });
        }
        this.setState(this.initialState);
    }

    render() {
        return (
            <div className="container">
                <h2>Customers page</h2>

                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.customersList()}
                    </tbody>
                </table>

                <button
                    onClick={::this.showModal}
                    style={{width: '80%', margin: '0 auto', display: 'block'}}
                    className="btn btn-lg btn-primary"
                >
                    Add a new customer
                </button>

                <Modal show={this.state.showModal} onHide={::this.showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.editMode ? 'Edit customer' : 'Create a new customer'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label className="control-label">Name and surname</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.customer.name}
                                onChange={(e) => this.onChange(e, 'name')}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.customer.address}
                                onChange={(e) => this.onChange(e, 'address')}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Phone number</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.customer.phone}
                                onChange={(e) => this.onChange(e, 'phone')}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={::this.showModal} className="btn btn-default">Close</button>
                        <button onClick={::this.onSave} className="btn btn-primary">Save</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        customers: state.customers.data
    }
}

export default connect(mapStateToProps, {
    customersFetching,
    customerCreate,
    customerEdit,
    customerDelete
})(Customers);