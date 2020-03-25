import React from 'react'
import { Link, withRouter } from 'react-router-dom'

// import './categories.styles.sass'
// import Category from './category.component'

const Categories = props => {
  return Object.keys(props.collections).map(collectionKey => {
    let collection = props.collections[collectionKey]

    return (
      <Link to={`${props.category}/${collectionKey}`} key={collectionKey}>
        <div className="collection">
          <h3>{collection.title}</h3>
        </div>
      </Link>
    )
  })
}

export default withRouter(Categories)
