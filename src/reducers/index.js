import {combineReducers} from 'redux'
import clientes from './clientes'
// import produtos from './produtos'

const rootReducer = combineReducers({ clientes,  })

export { rootReducer as default }