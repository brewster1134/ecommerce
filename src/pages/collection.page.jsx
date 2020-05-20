import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import React from 'react'

import './collection.styles.sass'
import { selectProducts } from '../state/store.state'
import ProductComponent from '../components/product.component'

const CollectionPage = ({ products, match }) => {
  return (
    <div className='collection-page'>
      <h4 className='collection-page__collection-name'>
        {match.params.collection}
      </h4>
      <div className='collection-page__products'>
        {products.map((product) => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts
})

export default connect(mapStateToProps)(CollectionPage)
