import React, { Component } from 'react';
import { connect } from 'react-redux';

import { customersFetching } from '../../actions/customersActions';
import { productsFetching } from '../../actions/productsActions';
import { createInvoice } from '../../actions/invoicesActions';

class CreateInvoice extends Component {
    constructor(props) {
        super(props);
        this.invoiceItem = {
            productId: '',
            price: 0,
            quantity: 1
        };

        this.initialState = {
            invoiceItems: [
                this.invoiceItem
            ],
            invoice: {
                customerId: '',
                discount: 0,
                total: 0,
                invoiceItems: []
            }
        };

        this.state = this.initialState;
    }

    componentDidMount() {
        this.props.customersFetching();
        this.props.productsFetching();
    }

    customersList() {
        if (this.props.customers && this.props.customers.length !== 0) {
            return this.props.customers.map((customer) => {
                return (
                    <option
                        value={customer.public_id}
                        key={customer.public_id}
                    >
                        {`${customer.name} - ${customer.address}`}
                    </option>
                );
            });
        }
    }

    productsList() {
        if (this.props.products && this.props.products.length !== 0) {
            return this.props.products.map((product) => {
                let isAlreadySelected = false;

                for (let i = 0; i < this.state.invoiceItems.length; i++) {
                    let item = this.state.invoiceItems[i];

                    if (item.productId === product.public_id) {
                        isAlreadySelected = true;
                    }
                }

                return (
                    <option
                        value={product.public_id}
                        key={product.public_id}
                        disabled={isAlreadySelected}
                    >
                        {`${product.name} - $${product.price}`}
                    </option>
                );
            });
        }
    }

    invoiceItemsList() {
        return this.state.invoiceItems.map((item, i) => {
            const deleteButton = (
                <div className="col-md-3">
                    <button
                        className="btn btn-danger"
                        style={{width: '100%'}}
                        onClick={(e) => this.onDeleteItem(e, i)}
                    >Delete Item</button>
                </div>
            );

            return (
                <div key={item.productId || i} className="form-group">
                    <div className="row">
                        <div className="col-md-7">
                            <select
                                className="form-control"
                                placeholder="Select a product"
                                onChange={(e) => this.onProductSelect(e, i)}
                                value={this.state.invoiceItems[i].productId}
                            >
                                <option value="" disabled>Select a product</option>
                                {::this.productsList()}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <input
                                type="number"
                                className="form-control"
                                value={this.state.invoiceItems[i].quantity}
                                onChange={(e) => this.onQuantityChange(e, i)}
                            />
                        </div>
                        {this.state.invoiceItems.length > 1 ? deleteButton : null }
                    </div>
                </div>
            );
        })
    }

    onCustomerSelect(e) {
        this.setState({
            invoice: { ...this.state.invoice, customerId: e.target.value}
        });
    }

    onProductSelect(e, j) {
        let selectedItemId = e.target.value,
            invoiceItem,
            newInvoicesItems = this.state.invoiceItems;

        for (let i = 0; i < this.props.products.length; i++) {
            let item = this.props.products[i];
            if (item.public_id === selectedItemId) {
                invoiceItem = {
                    ...this.state.invoiceItems[j],
                    productId: item.public_id,
                    price: item.price
                }
            }
        }
        newInvoicesItems.splice(j, 1, invoiceItem);

        this.setState({
            invoiceItems: newInvoicesItems
        });
        this.countSum();
    }

    onQuantityChange(e, i) {
        let invoiceItem = { ...this.state.invoiceItems[i], quantity: +e.target.value };
        let newInvoiceItems = this.state.invoiceItems;
        newInvoiceItems.splice(i, 1, invoiceItem);
        this.setState({
            invoiceItems: newInvoiceItems
        });
        this.countSum();
    }

    onDiscountChange(e) {
        let value = +e.target.value;

        if (value > 100 || value < 0 || isNaN(value)) {
            return false;
        }

        let setDiscount = new Promise((res) => {
            this.setState({
                invoice: {
                    ...this.state.invoice,
                    discount: value
                }
            });
            res();
        });

        setDiscount.then(() => {
            this.countSum();
        });
    }

    countSum() {
        let sum = 0;
        for (let i = 0; i < this.state.invoiceItems.length; i++) {
            let item = this.state.invoiceItems[i];
            sum += +item.price * +item.quantity;
        }
        sum = sum - sum * 0.01 * +this.state.invoice.discount;
        this.setState({
            invoice: {
                ...this.state.invoice,
                total: sum
            },
        });
    }

    addProduct(e) {
        e.preventDefault();
        let newInvoiceItemsArr = [ ...this.state.invoiceItems, this.invoiceItem ];
        this.setState({
            invoiceItems: newInvoiceItemsArr
        });
    }

    onDeleteItem(e, i) {
        e.preventDefault();
        let newInvoiceItems = this.state.invoiceItems;
        newInvoiceItems.splice(i, 1);
        let deleteItem = new Promise((res) => {
            this.setState({
                invoiceItems: newInvoiceItems
            });
            res();
        });

        deleteItem.then(() => {
            this.countSum();
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let invoice = { ...this.state.invoice, invoiceItems: this.state.invoiceItems };
        this.props.createInvoice(invoice);
    }

    componentWillUnmount() {
        this.setState(this.initialState);
    }

    render() {
        if (!this.props.products && !this.props.customers) {
            return null;
        }
        return (
            <div className="container container-md container-create">
                <form>
                    <h1>Create Invoice</h1>

                    <br/>

                    <div className="form-group">
                        <label className="control-label">Customer</label>
                        <select
                            className="form-control"
                            onChange={::this.onCustomerSelect}
                            value={this.state.customerId}
                        >
                            <option value="">Select a customer</option>
                            {this.customersList()}
                        </select>
                    </div>

                    <div className="form-group" style={{marginBottom: '0'}}>
                        <div className="row">
                            <div className="col-md-7">
                                <label className="control-label">Product name</label>
                            </div>
                            <div className="col-md-2">
                                <label className="control-label">Quantity</label>
                            </div>
                        </div>
                    </div>

                    {::this.invoiceItemsList()}

                    <br/>

                    <div className="form-group">
                        <button
                            onClick={(e) => this.addProduct(e)}
                            className="btn btn-success center-block"
                            style={{width: '30%'}}
                            disabled={!(this.state.invoiceItems.length < this.props.products.length)}
                        >
                            + Add New Item
                        </button>
                    </div>

                    <br/><br/>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-offset-6 col-md-4">
                                <label className="control-label">Discount</label>
                                <input
                                    className="form-control"
                                    onChange={::this.onDiscountChange}
                                    value={this.state.invoice.discount}
                                />
                            </div>
                            <div className="col-md-2">
                                <label className="control-label">Total</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.invoice.total}
                                    onKeyPress={() => {return false}}
                                />
                            </div>
                        </div>
                    </div>

                    <br/><br/>

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
        customers: state.customers,
        products: state.products
    }
}

export default connect(mapStateToProps, {
    customersFetching,
    productsFetching,
    createInvoice
})(CreateInvoice);