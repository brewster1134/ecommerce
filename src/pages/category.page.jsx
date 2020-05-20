import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link, withRouter } from 'react-router-dom'
import React from 'react'

import './category.styles.sass'
import { selectCollections } from '../state/store.state'

const CategoryPage = ({ collections, match }) => (
  <div className='category-page'>
    {collections.map((collection) => (
      <Link
        to={`${match.params.category}/${collection.id}`}
        key={collection.id}
      >
        <img src={collection.imageUrl} alt={collection.name} />
        <div>{collection.name}</div>
      </Link>
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections: selectCollections
})

export default withRouter(connect(mapStateToProps)(CategoryPage))
