import {combineReducers} from 'redux'
import clientes from './clientes'
import auth from './auth'
// import produtos from './produtos'

const rootReducer = combineReducers({ clientes, auth })

export { rootReducer as default }