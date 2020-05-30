import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import React from 'react'

import './home.styles.sass'
import { selectCategories } from '../state/store.state'

const HomePage = ({ categories }) => (
  <div className='home-page'>
    {categories.map((category) => (
      <div key={category.route} className='home-page__category'>
        <Link to={category.route}>
          <img src={category.imageUrl} alt={category.name} />
          <div>{category.name}</div>
        </Link>

        <div className='home-page__collections'>
          {category.collections.map((collection) => (
            <Link
              key={collection.route}
              to={`${category.route}/${collection.route}`}
            >
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
