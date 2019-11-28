import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { trackPromise } from 'react-promise-tracker';

import { MdAddShoppingCart } from 'react-icons/md';
import Loader from 'react-loader-spinner';

import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends React.Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await trackPromise(api.get('/products'));

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;
    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button
              type="button"
              onClick={() => this.handleAddProduct(product.id)}
            >
              <div>
                <Loader
                  type="TailSpin"
                  color="#fff"
                  height="16"
                  width="16"
                  visible={false}
                />
                <MdAddShoppingCart size={16} color="#fff" />{' '}
                {amount[product.id] || 0}
              </div>
              <span>Adicionar ao Carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, item) => {
    amount[item.id] = item.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
