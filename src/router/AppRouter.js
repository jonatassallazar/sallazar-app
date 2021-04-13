import React from 'react';
import { Switch, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {
  Dashboard,
  Clientes,
  AddCliente,
  EditarCliente,
  LoginPage,
  Produtos,
  AddProduto,
  Vendas,
  AddVendas,
  EditarVendas,
  Relatorios,
  Ajuda,
  EditarProduto,
} from '../components';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import GlobalStyle from '../GlobalStyle';

// pick a date util library
import MomentUtils from '@date-io/moment';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <GlobalStyle />
    <div className="app">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Switch>
          <PublicRoute path="/" component={LoginPage} exact={true} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/clientes" component={Clientes} exact={true} />
          <PrivateRoute path="/clientes/novo" component={AddCliente} />
          <PrivateRoute path="/clientes/editar/:id" component={EditarCliente} />
          <PrivateRoute path="/produtos" component={Produtos} exact={true} />
          <PrivateRoute path="/produtos/novo" component={AddProduto} />
          <PrivateRoute path="/produtos/editar/:id" component={EditarProduto} />
          <PrivateRoute path="/vendas" component={Vendas} exact={true} />
          <PrivateRoute path="/vendas/novo" component={AddVendas} />
          <PrivateRoute path="/vendas/editar/:id" component={EditarVendas} />
          <PrivateRoute path="/relatorios" component={Relatorios} />
          <PrivateRoute path="/ajuda" component={Ajuda} />
        </Switch>
      </MuiPickersUtilsProvider>
    </div>
  </Router>
);

export default AppRouter;
