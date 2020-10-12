import {combineReducers} from 'redux'
import clientes from './clientes'
import auth from './auth'
import filtrosClientes from './filtrosClientes'
// import produtos from './produtos'
import endereco from './endereco'

const rootReducer = combineReducers({ clientes, auth, filtrosClientes, endereco })

export { rootReducer as default }