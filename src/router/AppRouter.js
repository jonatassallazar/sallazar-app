import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
// import { createBrowserHistory } from 'history'
import Dashboard from '../components/Dashboard'
import Clientes from '../components/Clientes'
import Header from '../components/Header'
import AddCliente from '../components/AddCliente'
//import PrivateRoute from './PrivateRoute'
//import PublicRoute from './PublicRoute'

// export const history = createBrowserHistory()

const AppRouter = () => (
    <BrowserRouter>
        <div>
        <Header />
            <Switch>
                <Route path="/" exact={true}><p>Login Page</p></Route>
                <Route path="/dashboard" component={Dashboard}  />
                <Route path="/clientes" component={Clientes} exact={true}/>
                <Route path="/clientes/novo" component={AddCliente} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter