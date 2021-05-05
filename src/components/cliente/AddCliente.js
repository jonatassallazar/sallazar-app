import React from 'react';
import { useDispatch } from 'react-redux';
import { startAddCliente } from '../../actions/clientes';
import ClienteForm from './ClienteForm';
import { StyledButton } from '../forms/elements';
import { ArrowBackIos } from '@material-ui/icons';

const AddCliente = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <StyledButton.Link to="/clientes">
        <StyledButton.OnlyIcon>
          <ArrowBackIos />
        </StyledButton.OnlyIcon>
      </StyledButton.Link>
      <h1>Novo Cliente</h1>
      <ClienteForm
        onSubmit={(data) => {
          dispatch(startAddCliente(data));
          props.history.push('/clientes');
        }}
      />
    </div>
  );
};

export { AddCliente as default };
