import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AppRouter, {history} from './router/AppRouter';
import { firebase } from './database/firebase'
import { login, logout } from './actions/auth'
import { Provider } from 'react-redux'
import configureStore from './store/store'

const store = configureStore()
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'))
    hasRendered = true
  }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'))


firebase.auth().onIdTokenChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid))
    renderApp()
    if (history.location.pathname === '/') {
      history.push('/dashboard')
    }
  } else {
      store.dispatch(logout())
      renderApp()
      history.push('/')
    }
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
