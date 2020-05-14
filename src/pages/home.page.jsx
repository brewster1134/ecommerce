import React from 'react'
import { Link } from 'react-router-dom'

import './home.styles.sass'
import CategoryComponent from '../components/category.component'

const HomePage = (props) => (
  <div className='page-home'>
    {Object.entries(props.data.categories).map(([key, category]) => (
      <div className='page-home__category' key={key}>
        <Link className='page-home__category-cta' to={category.id}>
          <img src={category.imageUrl} alt={category.name} />
          <div>{category.name}</div>
        </Link>

        <CategoryComponent category={category} />
      </div>
    ))}
  </div>
)

export default HomePage
