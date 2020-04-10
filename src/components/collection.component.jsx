import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './collection.styles.sass'

const Collection = (props) => {
  console.log('COLLECTIONCOMP', props)

  return (
    <div
      className='component-collection'
      id={`collection_${props.collection.route}`}
    >
      <Link
        to={`/${props.match.params.category}`}
        key={props.match.params.category}
      >
        <h1>{props.categoryName}</h1>
      </Link>
      <div className='products'>
        {props.collection.products.map((product, i) => {
          return (
            <div className='product' id={`product_${i}`} key={`product_${i}`}>
              <h4>{product.name}</h4>
              <img alt={product.name} src={product.imageUrl} />
              <p>${product.price}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default withRouter(Collection)
