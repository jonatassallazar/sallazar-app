import { createStore } from 'redux'
import reducers from '../reducers/index'

let store = createStore(reducers)

export {store as default}