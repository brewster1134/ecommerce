// import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import React from 'react'

import './collection.styles.sass'
import { addProduct } from '../redux/cart.redux'

const CollectionComponent = (props) => {
  return (
    <div
      className='collection-component'
      id={`collection_${props.collection.id}`}
    >
      <div className='collection-component__sub-header'>
        <Link
          to={`/${props.match.params.category}`}
          key={props.match.params.category}
        >
          <h4>{props.categoryName}</h4>
        </Link>

        <h4 className='collection-component__collection-name'>
          {props.collection.name}
        </h4>
      </div>

      <div className='collection-component__products'>
        {props.collection.products.map((product, i) => {
          return (
            <div
              className='collection-component__product'
              id={`product_${i}`}
              key={`product_${i}`}
            >
              <img alt={product.name} src={product.imageUrl} />
              <div className='collection-component__meta-data'>
                <span className='collection-component__product-name'>
                  {product.name}
                </span>
                <span className='collection-component__price'>
                  ${product.price}
                </span>
              </div>
              <button
                className='hidden'
                onClick={() => props.addProduct(product)}
              >
                Add to Cart
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => dispatch(addProduct(product))
})

export default withRouter(
  connect(null, mapDispatchToProps)(CollectionComponent)
)
