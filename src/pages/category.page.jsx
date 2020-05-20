import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link, useParams } from 'react-router-dom'
import React from 'react'

import './category.styles.sass'
import { selectCollections } from '../state/store.state'

const CategoryPage = ({ collections }) => {
  const { category } = useParams()

  return (
    <div className='category-page'>
      {collections.map((collection) => (
        <Link key={collection.id} to={`${category}/${collection.id}`}>
          <img src={collection.imageUrl} alt={collection.name} />
          <div>{collection.name}</div>
        </Link>
      ))}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  collections: selectCollections
})

export default connect(mapStateToProps)(CategoryPage)
