import React from 'react'
import { withRouter } from 'react-router-dom'
import Category from '../components/category.component'

const CategoryPage = props => {
  const category = props.data[props.match.params.category]

  return (
    <div className='page-category'>
      <div className='category' id={`category_${props.match.params.category}`}>
        <h1>{category.title}</h1>
        <Category
          categoryKey={props.match.params.category}
          category={category}
        />
      </div>
    </div>
  )
}

export default withRouter(CategoryPage)
