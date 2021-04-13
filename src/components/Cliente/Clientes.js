import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectClientes from '../../selectors/clientes';
import ClienteItem from './ClienteItem';
import FiltroCliente from './FiltroCliente';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { startSetClientes } from '../../actions/clientes';
import ListaItens from '../Listas/ListaItens';

const Clientes = () => {
  const selection = useSelector((state) =>
    selectClientes(state.clientes, state.filtrosClientes)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetClientes());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        component={Link}
        to="/clientes/novo"
      >
        Novo Cliente
      </Button>
      <FiltroCliente />
      <ListaItens>
        {selection.map((cliente) => (
          <ClienteItem key={cliente.id} {...cliente} />
        ))}
      </ListaItens>
    </div>
  );
};

export { Clientes as default };
