import { withRouter } from 'react-router-dom'
import React from 'react'

import './collection.styles.sass'
import CollectionComponent from '../components/collection.component'

const CollectionPage = ({ categories, match }) => {
  const category = categories[match.params.category]
  const collection = category.collections[match.params.collection]

  return (
    <div className='collection-page'>
      <h4 className='collection-page__collection-name'>{collection.name}</h4>
      <CollectionComponent collection={collection} />
    </div>
  )
}

export default withRouter(CollectionPage)
