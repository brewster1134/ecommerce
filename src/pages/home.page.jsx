
import React from 'react'
import { Link } from 'react-router-dom'
import Category from '../components/category.component'

const HomePage = (props) => (
  <div className='page-home'>
    {
      Object.keys(props.data).map(categoryKey => {
        let obj = props.data[categoryKey]

        return (
          <section key={categoryKey}>
            <Link to={categoryKey}>
              <h1>{obj.title}</h1>
            </Link>
            <Category category={categoryKey} collections={obj.collections} />
          </section>
        )
      })
    }
  </div>
)

export default HomePage
