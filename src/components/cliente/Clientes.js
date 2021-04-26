import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectClientes from '../../selectors/clientes';
import { ClienteItem, FiltroCliente } from '../../components';
import { StyledButton } from '../forms/elements';
import { Listagem, ListaItens } from '../listas';
import Add from '@material-ui/icons/Add';
import { startSetClientes } from '../../actions/clientes';

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
    <Listagem>
      <Listagem.Title>Lista de Clientes</Listagem.Title>
      <StyledButton
        variant="contained"
        color="primary"
        startIcon={<Add />}
        component={Link}
        to="/clientes/novo"
      >
        Novo Cliente
      </StyledButton>
      <FiltroCliente />
      <ListaItens>
        {selection.map((cliente) => (
          <ClienteItem key={cliente.id} {...cliente} />
        ))}
      </ListaItens>
    </Listagem>
  );
};

export { Clientes as default };
