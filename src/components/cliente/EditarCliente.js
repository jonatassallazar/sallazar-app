import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startEditCliente, startRemoveCliente } from '../../actions/clientes';
import ClienteForm from './ClienteForm';
import { startSetClientes } from '../../actions/clientes';

const EditarCliente = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetClientes());
    // eslint-disable-next-line
  }, []);

  const cliente = useSelector((state) => {
    return state.clientes.find(
      (cliente) => cliente.id === props.match.params.id
    );
  });

  const onSubmit = (data) => {
    dispatch(startEditCliente(cliente.id, data)).then(() =>
      props.history.push(`/clientes`)
    );
  };

  const handleDelete = () => {
    dispatch(startRemoveCliente({ id: cliente.id })).then(() => {
      props.history.push('/clientes');
    });
  };

  return (
    <div>
      <h1>Editar Cliente</h1>
      <ClienteForm cliente={cliente} onSubmit={onSubmit} handleDelete={handleDelete}/>
    </div>
  );
};

export { EditarCliente as default };
