import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Redirect, Route, Switch } from 'react-router-dom'
import React from 'react'

import './App.sass'
import { auth, createUserRef, firestore } from './utils/firebase'
import { updateCategories } from './state/store.state'
import { selectCurrentUser, setCurrentUser } from './state/user.state'
import CategoryPage from './pages/category.page'
import CheckoutPage from './pages/checkout.page'
import CollectionPage from './pages/collection.page'
import HeaderComponent from './components/header.component'
import HomePage from './pages/home.page'
import LoginPage from './pages/login.page'

class App extends React.Component {
  authUnsubscribe = null
  categoriesUnsubscribe = null

  componentDidMount() {
    const { setCurrentUser, updateCategories } = this.props

    // DATABASE
    // get all categories
    const categoriesRef = firestore.collection('categories')

    // subscribe to categories snapshot
    this.categoriesUnsubscribe = categoriesRef.onSnapshot(async (snapshot) => {
      // get all categories, and resolve promises
      const categoriesDocs = await Promise.all(
        snapshot.docs.map(async (category) => {
          // get the category data (minus the collections sub-collection)
          const catData = category.data()

          // get the category collections ref
          const catCollectionsRef = category.ref.collection('collections')

          // get the category collections
          const catCollections = await catCollectionsRef.get()

          // get the category collections data
          const catCollectionsData = catCollections.docs.map((collection) =>
            collection.data()
          )

          // set collections data to the rest of the category data
          catData.collections = catCollectionsData

          // return the full category data
          return catData
        })
      )

      // update state with categories
      updateCategories(categoriesDocs)
    })

    // AUTH
    //
    this.authUnsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserRef(userAuth)

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })

        return <Redirect to='/' />
      } else {
        setCurrentUser(null)
      }
    })
  }

  componentWillUnmount() {
    this.authUnsubscribe()
    this.categoriesUnsubscribe()
  }

  render() {
    return (
      <div>
        <HeaderComponent />

        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>

          {/* TODO: use <Route children> instead of <Route render> https://github.com/ReactTraining/react-router/blob/f59ee5488bc343cf3c957b7e0cc395ef5eb572d2/docs/advanced-guides/migrating-5-to-6.md#relative-routes-and-links
            unclear how to use conditions within a route without using render
          */}
          <Route
            exact
            path='/login'
            render={() =>
              this.props.currentUser ? <Redirect to='/' /> : <LoginPage />
            }
          />

          <Route exact path='/checkout'>
            <CheckoutPage />
          </Route>

          {/* TODO: use <Route children> instead of <Route component> https://github.com/ReactTraining/react-router/blob/f59ee5488bc343cf3c957b7e0cc395ef5eb572d2/docs/advanced-guides/migrating-5-to-6.md#relative-routes-and-links
            when using <Route children>, throws the error `Cannot read property params of undefined`
          */}
          <Route exact path={`/:category`} component={CategoryPage} />

          <Route
            exact
            path={`/:category/:collection`}
            component={CollectionPage}
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  updateCategories: (categories) => dispatch(updateCategories(categories))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
