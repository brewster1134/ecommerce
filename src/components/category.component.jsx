import React from 'react'
import { Link } from 'react-router-dom'
import './category.styles.sass'

const Category = (props) => {
  return (
    <div className='component-category' id={`category_${props.category.route}`}>
      {Object.entries(props.category.collections).map(([key, collection]) => {
        return (
          <Link
            to={`${props.category.route}/${collection.route}`}
            key={collection.route}
          >
            {!!props.showImage ? (
              <img src={collection.imageUrl} alt={collection.name} />
            ) : null}
            <h3>{collection.name}</h3>
          </Link>
        )
      })}
    </div>
  )
}

export default Category
