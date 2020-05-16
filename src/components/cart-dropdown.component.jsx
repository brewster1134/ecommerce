import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import React from 'react'

import './cart-dropdown.styles.sass'
import { selectProducts, toggleDropdown } from '../state/cart.state'

const CartDropdownComponent = ({ products, history, toggleDropdown }) => {
  const handleClick = () => {
    toggleDropdown(false)
    history.push('/checkout')
  }

  return (
    <div className='cart-dropdown-component'>
      {products.length ? (
        <div>
          <ul>
            {products.map((product) => (
              <li className='cart-dropdown-component__product' key={product.id}>
                <div>
                  <div>{product.name}</div>
                  <div>
                    {product.quantity} x ${product.price}
                  </div>
                </div>
                <img src={product.imageUrl} alt={product.name} />
              </li>
            ))}
          </ul>
          <button onClick={handleClick}>Checkout</button>
        </div>
      ) : (
        <div className='cart-dropdown-component__empty'>Your Cart is Empty</div>
      )}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts
})

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: (visible) => dispatch(toggleDropdown(visible))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdownComponent)
)
