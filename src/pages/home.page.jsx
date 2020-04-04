import React from 'react'
import { Link } from 'react-router-dom'
import Category from '../components/category.component'

const HomePage = props => (
  <div className='page-home'>
    {Object.keys(props.data).map(categoryKey => {
      const category = props.data[categoryKey]

      return (
        <section className='category' key={categoryKey}>
          <Link className='category__cta' to={categoryKey}>
            <h1>{category.title}</h1>
          </Link>
          <Category categoryKey={categoryKey} category={category} />
        </section>
      )
    })}
  </div>
)

export default HomePage
