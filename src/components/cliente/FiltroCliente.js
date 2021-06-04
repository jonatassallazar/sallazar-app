import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmailFiltro,
  setNomeFiltro,
  setTelefoneFiltro,
  limparFiltro,
} from '../../actions/filtrosClientes';
import Form from '../forms/Form';
import { StyledButton, StyledTextField } from '../forms/elements';
import NumberFormat from 'react-number-format';

const FiltroCliente = () => {
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
            data-testid="filtro-nome"
            type="text"
            value={nome}
            label="Nome"
            onChange={(e) => {
              dispatch(setNomeFiltro(e.target.value));
            }}
          />
          <StyledTextField
            data-testid="filtro-email"
            type="text"
            value={email}
            label="Email"
            onChange={(e) => {
              dispatch(setEmailFiltro(e.target.value));
            }}
          />
          <NumberFormat
            data-testid="filtro-tel"
            type="tel"
            label="Telefone"
            customInput={StyledTextField}
            value={telefone}
            onValueChange={(values) =>
              dispatch(setTelefoneFiltro(values.value))
            }
            format="(##)#####-####"
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
