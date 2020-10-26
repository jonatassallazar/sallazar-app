import {combineReducers} from 'redux'
import clientes from './clientes'
import auth from './auth'
import filtrosClientes from './filtrosClientes'
import produtos from './produtos'
import filtrosProdutos from './filtrosProdutos'

const rootReducer = combineReducers({ clientes, auth, filtrosClientes, produtos, filtrosProdutos })

export { rootReducer as default }