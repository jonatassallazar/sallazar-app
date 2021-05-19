import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startEditCliente,
  startRemoveCliente,
  startSetClientes,
} from '../../actions/clientes';
import ClienteForm from './ClienteForm';
import { StyledButton } from '../forms/elements';
import { ArrowBackIos } from '@material-ui/icons';

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

  // Will render component only with props
  const [haveProps, setHaveProps] = useState(false);
  useEffect(() => {
    if (cliente) {
      setHaveProps(true);
    }
  }, [cliente]);

  const onSubmit = (data) => {
    dispatch(startEditCliente(cliente.id, data))
      .then(() => props.history.push(`/clientes`))
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    dispatch(startRemoveCliente({ id: cliente.id })).then(() => {
      props.history.push('/clientes');
    });
  };

  return (
    <div>
      <StyledButton.Link to="/clientes">
        <StyledButton.OnlyIcon>
          <ArrowBackIos />
        </StyledButton.OnlyIcon>
      </StyledButton.Link>
      <h1>Editar Cliente</h1>
      {haveProps && (
        <ClienteForm
          cliente={cliente}
          onSubmit={onSubmit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export { EditarCliente as default };
