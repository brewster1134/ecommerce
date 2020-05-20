import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import React from 'react'

import './home.styles.sass'
import { selectCategories } from '../state/store.state'

const HomePage = ({ categories }) => (
  <div className='home-page'>
    {categories.map((category) => (
      <div className='home-page__category' key={category.id}>
        <Link to={category.id}>
          <img src={category.imageUrl} alt={category.name} />
          <div>{category.name}</div>
        </Link>

        <div className='home-page__collections'>
          {category.collections.map((collection) => (
            <Link to={`${category.id}/${collection.id}`} key={collection.id}>
              {collection.name}
            </Link>
          ))}
        </div>
      </div>
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  categories: selectCategories
})

export default connect(mapStateToProps)(HomePage)
