import React from 'react'
import { Switch, Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import Dashboard from '../components/Dashboard'
import Clientes from '../components/Clientes'
import AddCliente from '../components/AddCliente'
import EditarCliente from '../components/EditarCliente'
import { LoginPage } from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Produtos from '../components/Produtos'
import AddProduto from '../components/AddProduto'
import Vendas from '../components/Vendas'
import AddVendas from '../components/AddVendas'
import EditarVendas from '../components/EditarVendas'
import Relatorios from '../components/Relatorios'
import Ajuda from '../components/Ajuda'
import EditarProduto from '../components/EditarProduto'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import MomentUtils from '@date-io/moment';



export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <div className="app">
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={Dashboard}  />
                <PrivateRoute path="/clientes" component={Clientes} exact={true}/>
                <PrivateRoute path="/clientes/novo" component={AddCliente} />
                <PrivateRoute path="/clientes/editar/:id" component={EditarCliente} />
                <PrivateRoute path="/produtos" component={Produtos} exact={true}/>
                <PrivateRoute path="/produtos/novo" component={AddProduto} />
                <PrivateRoute path="/produtos/editar/:id" component={EditarProduto} />
                <PrivateRoute path="/vendas" component={Vendas} exact={true}/>
                <PrivateRoute path="/vendas/novo" component={AddVendas} />
                <PrivateRoute path="/vendas/editar/:id" component={EditarVendas} />
                <PrivateRoute path="/relatorios" component={Relatorios} />
                <PrivateRoute path="/ajuda" component={Ajuda} />
            </Switch>
            </MuiPickersUtilsProvider>
        </div>
    </Router>
)

export default AppRouter