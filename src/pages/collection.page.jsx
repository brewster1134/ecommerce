import React from 'react'
import { withRouter } from 'react-router-dom'
import Collection from '../components/collection.component'

const CollectionPage = props => {
  const collection =
    props.data[props.match.params.category].collections[
      props.match.params.collection
    ]

  return (
    <div className='page-collection'>
      <Collection
        collectionKey={props.match.params.collection}
        collection={collection}
      />
    </div>
  )
}

export default withRouter(CollectionPage)
