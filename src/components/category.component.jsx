import React from 'react'
import { Link } from 'react-router-dom'

const Category = props => {
  return (
    <div className='category' id={`category_${props.categoryKey}`}>
      {Object.keys(props.category.collections).map(collectionKey => {
        const collection = props.category.collections[collectionKey]

        return (
          <Link
            className='collection__cta'
            to={`${props.categoryKey}/${collectionKey}`}
            key={collectionKey}
          >
            <div className='collection'>
              <h3>{collection.title}</h3>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Category
