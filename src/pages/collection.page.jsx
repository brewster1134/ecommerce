import React from 'react'
import { withRouter } from 'react-router-dom'

import CollectionComponent from '../components/collection.component.jsx'

const CollectionPage = (props) => {
  const category = props.data.categories[props.match.params.category]
  const collection = category.collections[props.match.params.collection]

  return (
    <div className='page-collection'>
      <CollectionComponent
        categoryName={category.name}
        collection={collection}
      />
    </div>
  )
}

export default withRouter(CollectionPage)
