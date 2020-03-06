import React from 'react'
import './categories.styles.sass'

import Category from './category.component'

class Categories extends React.Component {
  constructor() {
    super()
  }

  state = {
    categories: [
      {
        title: 'Men',
        color: 'LightBlue'
      }, {
        title: 'Women',
        color: 'LightPink'
      }
    ]
  }

  render() {
    return (
      <div className='ecommerce__categories'>
      {
        this.state.categories.map(({ title, color }, index) => (
          <Category id={index} title={title} color={color} />
        ))
      }
      </div>
    )
  }
}

export default Categories
