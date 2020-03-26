
import React from 'react'
import { withRouter } from 'react-router-dom'
import Category from '../components/category.component'

const CategoryPage = props => (
  <div className="page-category">
    <div className={`cat_${props.match.params.category}`}>
      <Category
      category={props.match.params.category}
      collections={props.data[props.match.params.category].collections}
      />
    </div>
  </div>
)

export default withRouter(CategoryPage)
