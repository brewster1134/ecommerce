import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Collection from '../components/collection.component'

const CollectionPage = (props) => {
  const category = props.data.categories[props.match.params.category]
  const collection = category.collections[props.match.params.collection]

  return (
    <div className='page-collection'>
      <Link to='/' key='home'>
        <h2>Home</h2>
      </Link>

      <Collection
        categoryName={props.match.params.category}
        collection={collection}
      />
    </div>
  )
}

export default withRouter(CollectionPage)
