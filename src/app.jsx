import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import React from 'react'

import './App.sass'
import { auth, userCreateRef } from './utils/firebase'
import { userSetCurrent } from './redux/user.redux'
import CategoryPage from './pages/category.page'
import CollectionPage from './pages/collection.page'
import HeaderComponent from './components/header.component'
import HomePage from './pages/home.page'
import LoginPage from './pages/login.page'
import StoreData from './assets/store.data.json'

class App extends React.Component {
  authUnsubscribe = null

  componentDidMount() {
    const { userSetCurrent } = this.props

    this.authUnsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await userCreateRef(userAuth)

        userRef.onSnapshot((snapshot) => {
          userSetCurrent({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      } else {
        userSetCurrent(null)
      }
    })
  }

  componentWillUnmount() {
    this.authUnsubscribe()
  }

  render() {
    return (
      <div className='ecommerce'>
        <HeaderComponent />

        <Switch>
          <Route
            exact
            path='/'
            component={() => <HomePage data={StoreData} />}
          />
          <Route
            exact
            path='/login'
            render={() =>
              this.props.currentUser ? <Redirect to='/' /> : <LoginPage />
            }
          />

          <Route
            exact
            path={`/:category`}
            component={() => <CategoryPage data={StoreData} />}
          />

          <Route
            exact
            path={`/:category/:collection`}
            component={() => <CollectionPage data={StoreData} />}
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  userSetCurrent: (user) => dispatch(userSetCurrent(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
