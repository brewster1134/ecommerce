import React from 'react'

const Collection = props => {
  return (
    <div className='collection' id={`collection_${props.collectionKey}`}>
      {props.collection.products.map((product, i) => {
        return (
          <div className='product' id={`product_${i}`} key={`product_${i}`}>
            <h4>{product.name}</h4>
            <img alt={product.name} src={product.imageUrl} />
            <p>{product.price}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Collection
