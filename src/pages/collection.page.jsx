import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import React from 'react'

import './collection.styles.sass'
import { fetchProducts, selectProducts } from '../state/store.state'
import ProductComponent from '../components/product.component'

class CollectionPage extends React.Component {
  productsUnsubscribe = null

  componentDidMount() {
    const { fetchProducts } = this.props

    this.productsUnsubscribe = fetchProducts()
  }

  componentWillUnmount() {
    this.productsUnsubscribe()
  }

  render() {
    const { collection } = this.props.match.params
    const { products } = this.props

    return (
      <div className='collection-page'>
        <h4 className='collection-page__collection-name'>{collection}</h4>
        <div className='collection-page__products'>
          {products.map((product) => (
            <ProductComponent key={product.id} product={product} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts
})

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage)
