import React from 'react'

const Category = ({ id, title, color }) => {
  return (
    <div
      className='ecommerce_category'
      id={`cat_${id}`}
      style={{backgroundColor: `${color}`}}
    >
    <div className='ecommerce__copy'>
      <h1 className='ecommerce__title'>{title}</h1>
      <p className='ecommerce__subtitle'>Shop Now</p>
    </div>
  </div>
  )
}

export default Category
