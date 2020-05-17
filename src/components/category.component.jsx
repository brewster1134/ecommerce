import React from 'react'
import { Link } from 'react-router-dom'

import './category.styles.sass'

const CategoryComponent = ({ category, showImage }) => (
  <div
    className={`category-component ${!!showImage ? 'has-image' : ''}`}
    id={`category_${category.id}`}
  >
    {Object.values(category.collections).map((collection) => (
      <Link
        className='category-component__cta'
        to={`${category.id}/${collection.id}`}
        key={collection.id}
      >
        {!!showImage ? (
          <img src={collection.imageUrl} alt={collection.name} />
        ) : null}

        <div>{collection.name}</div>
      </Link>
    ))}
  </div>
)

export default CategoryComponent
