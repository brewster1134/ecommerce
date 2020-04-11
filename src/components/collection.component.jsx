import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import './collection.styles.sass'

const CollectionComponent = (props) => (
  <div
    className='component-collection'
    id={`collection_${props.collection.id}`}
  >
    <div className='component-collection__sub-header'>
      <Link
        to={`/${props.match.params.category}`}
        key={props.match.params.category}
      >
        <h2>{props.categoryName}</h2>
      </Link>
      <h2 className='component-collection__collection-name'>
        {props.collection.name}
      </h2>
    </div>
    <div className='component-collection__products'>
      {props.collection.products.map((product, i) => {
        return (
          <div
            className='component-collection__product'
            id={`product_${i}`}
            key={`product_${i}`}
          >
            <h4 className='component-collection__product-name'>
              {product.name}
            </h4>
            <img alt={product.name} src={product.imageUrl} />
            <div className='component-collection__price'>${product.price}</div>
          </div>
        )
      })}
    </div>
  </div>
)

export default withRouter(CollectionComponent)
