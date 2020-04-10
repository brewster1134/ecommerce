import React from 'react'
import { Link } from 'react-router-dom'
import Category from '../components/category.component'
import './home.styles.sass'

const HomePage = (props) => {
  return (
    <div className='page-home'>
      {Object.entries(props.data.categories).map(([key, category]) => (
        <div key={key}>
          <Link className='category__cta' to={category.route}>
            <img src={category.imageUrl} alt={category.name} />
            <h1>{category.name}</h1>
          </Link>
          <Category category={category} />
        </div>
      ))}
    </div>
  )
}

export default HomePage
