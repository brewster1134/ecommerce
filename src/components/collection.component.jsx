import { connect } from 'react-redux'
import React from 'react'

import './collection.styles.sass'
import { addProduct } from '../state/cart.state'

const CollectionComponent = ({ addProduct, collection }) => (
  <div className='collection-component' id={`collection_${collection.id}`}>
    <div className='collection-component__products'>
      {collection.products.map((product, i) => (
        <div
          className='collection-component__product'
          id={`product_${i}`}
          key={`product_${i}`}
        >
          <img alt={product.name} src={product.imageUrl} />
          <div className='collection-component__meta-data'>
            <span>{product.name}</span>
            <span>${product.price}</span>
          </div>
          <button className='hidden' onClick={() => addProduct(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => dispatch(addProduct(product))
})

export default connect(null, mapDispatchToProps)(CollectionComponent)
