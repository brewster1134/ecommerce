import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Category from '../components/category.component'
import './category.styles.sass'

const CategoryPage = (props) => {
  const category = props.data.categories[props.match.params.category]

  return (
    <div className='page-category'>
      <Link to='/' key='home'>
        <h1>Home</h1>
      </Link>

      <div className='category' id={`category_${props.match.params.category}`}>
        <Category category={category} showImage={true} />
      </div>
    </div>
  )
}

export default withRouter(CategoryPage)
