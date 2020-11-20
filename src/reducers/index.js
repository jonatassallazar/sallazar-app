import {combineReducers} from 'redux'
import clientes from './clientes'
import auth from './auth'
import filtrosClientes from './filtrosClientes'
import produtos from './produtos'
import filtrosProdutos from './filtrosProdutos'
import vendas from './vendas'
import filtrosVendas from './filtrosVendas'

const rootReducer = combineReducers({ clientes, auth, filtrosClientes, produtos, filtrosProdutos, vendas, filtrosVendas })

export { rootReducer as default }