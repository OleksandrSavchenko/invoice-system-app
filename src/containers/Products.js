import React, { Component } from 'react';
import { connect } from 'react-redux';

import { productsFetching } from '../actions/productsActions';

class Products extends Component {
    componentDidMount() {
        this.props.productsFetching();
    }

    productsList() {
        return this.props.products.map((product, i) => {
            return (
                <tr key={product.public_id}>
                    <th scope="row">{i + 1}</th>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
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
        if (this.props.products.length === 0) {
            return null;
        }

        return (
            <div className="container">
                <h2>Products page</h2>

                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.productsList()}
                    </tbody>
                </table>

                <button
                    style={{width: '80%', margin: '0 auto', display: 'block'}}
                    className="btn btn-lg btn-primary"
                >
                    Add a new product
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps, { productsFetching })(Products);