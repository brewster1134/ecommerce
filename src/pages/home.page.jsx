import React from 'react'
import { Link } from 'react-router-dom'

import './home.styles.sass'
import CategoryComponent from '../components/category.component'

const HomePage = (props) => (
  <div className='page-home'>
    {Object.entries(props.data.categories).map(([key, category]) => (
      <div className='category' key={key}>
        <Link className='category__cta' to={category.id}>
          <img src={category.imageUrl} alt={category.name} />
          <h2 className='category__cta-name'>{category.name}</h2>
        </Link>

        <CategoryComponent category={category} />
      </div>
    ))}
  </div>
)

export default HomePage
