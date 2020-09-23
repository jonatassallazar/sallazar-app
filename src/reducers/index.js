import {combineReducers} from 'redux'
import clientes from './clientes'
import auth from './auth'
import filtrosClientes from './filtrosClientes'
// import produtos from './produtos'

const rootReducer = combineReducers({ clientes, auth, filtrosClientes })

export { rootReducer as default }