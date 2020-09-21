import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import Dashboard from '../components/Dashboard'
import Clientes from '../components/Clientes'
import AddCliente from '../components/AddCliente'
import { LoginPage } from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'


export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={Dashboard}  />
                <PrivateRoute path="/clientes" component={Clientes} exact={true}/>
                <PrivateRoute path="/clientes/novo" component={AddCliente} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter