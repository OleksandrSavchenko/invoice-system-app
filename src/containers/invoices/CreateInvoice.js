import React, { Component } from 'react';
import { connect } from 'react-redux';

import { customersFetching } from '../../actions/customersActions';
import { productsFetching } from '../../actions/productsActions';

class CreateInvoice extends Component {
    constructor(props) {
        super(props);
        this.invoiceItem = {
            invoice_id: null,
            product_id: null,
            quantity: 1,
            name: '',
            price: ''
        };

        this.initialState = {
            invoiceItems: [
                this.invoiceItem,
            ],
            invoice: {
                customer_id: null,
                discount: 0,
                total: 0
            },
            selectedProducts: []
        };

        this.state = this.initialState;
    }

    componentDidMount() {
        this.props.customersFetching();
        this.props.productsFetching();
    }

    customersList() {
        if (this.props.customers) {
            return this.props.customers.map((customer) => {
                return (
                    <option
                        value={customer.id}
                        key={customer.id + customer.name}
                    >
                        {`${customer.name} - ${customer.address}`}
                    </option>
                );
            });
        }
    }

    productsList() {
        if (this.props.products) {
            return this.props.products.map((product) => {
                let isAlreadySelected = this.state.selectedProducts.indexOf(product.id) !== -1;
                return (
                    <option
                        value={product.id}
                        key={product.id + product.name}
                        disabled={isAlreadySelected}
                    >
                        {`${product.name} - $${product.price}`}
                    </option>
                );
            });
        }
    }

    invoiceItemsList() {
        return this.state.invoiceItems.map((product, i) => {
            return (
                <div key={i + 'asdf23'} className="form-group">
                    <div className="row">
                        <div className="col-md-10">
                            <select
                                className="form-control"
                                onChange={(e) => this.productConfiguration(e, i, 'product_id')}
                                value={this.state.invoiceItems[i].id}
                            >
                                <option value="">Select a product</option>
                                {this.productsList()}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <input
                                type="number"
                                className="form-control"
                                value={this.state.invoiceItems[i].quantity}
                                onChange={(e) => this.productConfiguration(e, i, 'quantity')}
                            />
                        </div>
                    </div>
                </div>
            );
        })
    }

    productConfiguration(e, i, name) {
        let value = Number(e.target.value),
            invoiceItem = { ...this.state.invoiceItems[i], [name]: value },
            newInvoicesItemsArr = this.state.invoiceItems;

        newInvoicesItemsArr.splice(i, 1, invoiceItem);

        if (name === 'product_id') {
            let selectedProducts = [ ...this.state.selectedProducts, value ];
            this.setState({
                selectedProducts: selectedProducts,
                invoiceItems: newInvoicesItemsArr
            });
        } else {
            this.setState({ invoiceItems: newInvoicesItemsArr });
        }
    }

    addProduct(e) {
        e.preventDefault();
        let newInvoiceItemsArr = [ ...this.state.invoiceItems, this.invoiceItem ];
        this.setState({
            invoiceItems: newInvoiceItemsArr
        });
    }

    onCustomerSelect(e) {
        let newInvoiceObj = { ...this.state.invoice, customer_id: e.target.value};
        this.setState({
            invoice: newInvoiceObj
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className="container container-md container-create">
                <form>
                    <h1>Create Invoice</h1>

                    <div className="form-group">
                        <label className="control-label">Customer</label>
                        <select
                            className="form-control"
                            onChange={::this.onCustomerSelect}
                            value={this.state.customer_id}
                        >
                            <option value="">Select a customer</option>
                            {this.customersList()}
                        </select>
                    </div>

                    <div className="form-group" style={{marginBottom: '0'}}>
                        <div className="row">
                            <div className="col-md-10">
                                <label className="control-label">Product name</label>
                            </div>
                            <div className="col-md-2">
                                <label className="control-label">Quantity</label>
                            </div>
                        </div>
                    </div>

                    {::this.invoiceItemsList()}

                    <div className="form-group">
                        <button
                            onClick={(e) => this.addProduct(e)}
                            className="btn btn-success"
                            disabled={!(this.state.invoiceItems.length < this.props.products.length)}
                        >
                            Add a product
                        </button>
                    </div>

                    <div className="form-group">
                        <button
                            onClick={::this.onSubmit}
                            className="btn btn-primary btn-lg btn-save"
                        >
                            Create invoice
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        customers: state.customers.data,
        products: state.products.data
    }
}

export default connect(mapStateToProps, { customersFetching, productsFetching })(CreateInvoice);