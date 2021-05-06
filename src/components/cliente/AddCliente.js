import React from 'react';
import { useDispatch } from 'react-redux';
import { startAddCliente } from '../../actions/clientes';
import ClienteForm from './ClienteForm';
import { StyledButton } from '../forms/elements';
import { ArrowBackIos } from '@material-ui/icons';

const AddCliente = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    if (props.handleSubmit) {
      dispatch(startAddCliente(data)).then((res) => {
        props.handleSubmit(res.cliente);
      });
    } else {
      dispatch(startAddCliente(data)).then(() => {
        props.history.push('/clientes');
      });
    }
  };

  return (
    <div>
      {!props.showBackButton && (
        <StyledButton.Link to="/clientes">
          <StyledButton.OnlyIcon>
            <ArrowBackIos />
          </StyledButton.OnlyIcon>
        </StyledButton.Link>
      )}
      <h1>Novo Cliente</h1>
      <ClienteForm onSubmit={handleSubmit} />
    </div>
  );
};

export { AddCliente as default };
