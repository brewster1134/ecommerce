import React from 'react'
import { withRouter } from 'react-router-dom'

import CategoryComponent from '../components/category.component'
import './category.styles.sass'

const CategoryPage = ({ categories, match }) => {
  const category = categories[match.params.category]

  return (
    <div className='category-page'>
      <CategoryComponent category={category} showImage={true} />
    </div>
  )
}

export default withRouter(CategoryPage)
