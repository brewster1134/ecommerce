import React from 'react'
import { Link } from 'react-router-dom'

import './category.styles.sass'

const CategoryComponent = (props) => (
  <div
    className={`category-component ${!!props.showImage ? 'has-image' : ''}`}
    id={`category_${props.category.id}`}
  >
    {Object.entries(props.category.collections).map(([key, collection]) => {
      return (
        <Link
          className='category-component__cta'
          to={`${props.category.id}/${collection.id}`}
          key={collection.id}
        >
          {!!props.showImage ? (
            <img src={collection.imageUrl} alt={collection.name} />
          ) : null}

          <h3 className='category-component__name'>{collection.name}</h3>
        </Link>
      )
    })}
  </div>
)

export default CategoryComponent
