import React from 'react'
import { Link } from 'react-router-dom'

import './home.styles.sass'
import CategoryComponent from '../components/category.component'

const HomePage = ({ categories }) => (
  <div className='home-page'>
    {Object.values(categories).map((category) => (
      <div className='home-page__category' key={category.id}>
        <Link className='home-page__category-cta' to={category.id}>
          <img src={category.imageUrl} alt={category.name} />
          <div>{category.name}</div>
        </Link>

        <CategoryComponent category={category} />
      </div>
    ))}
  </div>
)

export default HomePage
