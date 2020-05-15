import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectProducts } from '../state/cart.state'

const CheckoutPage = ({ products }) => {
  return (
    <div className='checkout-page'>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts
})

export default connect(mapStateToProps)(CheckoutPage)
