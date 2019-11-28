import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

import { Container, ProductTable, Total, Empty } from './styles';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  function increment(item) {
    updateAmountRequest(item.id, item.amount + 1);
  }

  function decrement(item) {
    updateAmountRequest(item.id, item.amount - 1);
  }

  return (
    <Container>
      {cart.length <= 0 ? (
        <Empty>
          <span>Carrinho Vazio :-(</span>
        </Empty>
      ) : (
        <div>
          <ProductTable>
            <thead>
              <tr>
                <th />
                <th>PRODUTO</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr keyt={index}>
                  <td>
                    <img src={item.image} alt={item.title} />
                  </td>
                  <td>
                    <strong>{item.title}</strong>
                    <span>{item.priceFormatted}</span>
                  </td>
                  <td>
                    <div>
                      <button type="button" onClick={() => decrement(item)}>
                        <MdRemoveCircleOutline size={20} color="#7159c1" />
                      </button>
                      <input type="number" readOnly value={item.amount} />
                      <button type="button" onClick={() => increment(item)}>
                        <MdAddCircleOutline size={20} color="#7159c1" />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{item.subtotalFormatted}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <MdDelete size={20} color="#7159c1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>
          <footer>
            <button type="button">Finalizar Pedido</button>
            <Total>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </div>
      )}
    </Container>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

const mapStateToProps = state => ({
  cart: state.cart.map(item => ({
    ...item,
    subtotal: item.amount * item.price,
    subtotalFormatted: formatPrice(item.amount * item.price),
  })),
  total: formatPrice(
    state.cart.reduce((total, item) => {
      return total + item.amount * item.price;
    }, 0)
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
