import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmailFiltro,
  setNomeFiltro,
  setTelefoneFiltro,
  limparFiltro,
} from '../../actions/filtrosClientes';
import Form from '../forms/Form';
import { TextField } from '@material-ui/core';
import { StyledButton, StyledTextField } from '../forms/elements';
import NumberFormat from 'react-number-format';

const FiltroCliente = (props) => {
  const dispatch = useDispatch();
  const { nome, email, telefone } = useSelector(
    (state) => state.filtrosClientes
  );

  return (
    <Form>
      <Form.Filtro>
        <Form.Filtro.Title>Filtrar</Form.Filtro.Title>
        <Form.Division>
          <StyledTextField
            type="text"
            value={nome}
            label="Nome"
            onChange={(e) => {
              dispatch(setNomeFiltro(e.target.value));
            }}
          />
          <StyledTextField
            type="text"
            value={email}
            label="Email"
            onChange={(e) => {
              dispatch(setEmailFiltro(e.target.value));
            }}
          />
          <NumberFormat
            type="tel"
            label="Telefone"
            value={telefone}
            onValueChange={(values) =>
              dispatch(setTelefoneFiltro(values.value))
            }
            format="(99)99999-9999"
          />
          <StyledButton onClick={(e) => dispatch(limparFiltro())}>
            Limpar
          </StyledButton>
        </Form.Division>
      </Form.Filtro>
    </Form>
  );
};

export { FiltroCliente as default };
