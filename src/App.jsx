import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Redirect, Route, Switch } from 'react-router-dom'
import React from 'react'

import './App.sass'
import { auth, createUserRef } from './utils/firebase'
import { selectCurrentUser, setCurrentUser } from './state/user.state'
import { selectIsLoading } from './state/app.state'
import { fetchCategories } from './state/store.state'
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
    const { fetchCategories, setCurrentUser } = this.props

    //
    // CATEGORIES
    //
    this.categoriesUnsubscribe = fetchCategories()

    //
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
    const { currentUser, isLoading } = this.props

    return (
      <div className={`${isLoading ? 'is-loading' : ''}`}>
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
            render={() => (currentUser ? <Redirect to='/' /> : <LoginPage />)}
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
  currentUser: selectCurrentUser,
  isLoading: selectIsLoading
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  fetchCategories: (categories) => dispatch(fetchCategories(categories))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
