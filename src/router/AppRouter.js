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
                <PrivateRoute path="/editar/:id" component={EditarCliente} />
            </Switch>
            </MuiPickersUtilsProvider>
        </div>
    </Router>
)

export default AppRouter