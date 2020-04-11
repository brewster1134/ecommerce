import React from 'react'
import { Link } from 'react-router-dom'

import './category.styles.sass'

const CategoryComponent = (props) => (
  <div className='component-category' id={`category_${props.category.id}`}>
    {Object.entries(props.category.collections).map(([key, collection]) => {
      return (
        <Link to={`${props.category.id}/${collection.id}`} key={collection.id}>
          {!!props.showImage ? (
            <img src={collection.imageUrl} alt={collection.name} />
          ) : null}
          <h3>{collection.name}</h3>
        </Link>
      )
    })}
  </div>
)

export default CategoryComponent
