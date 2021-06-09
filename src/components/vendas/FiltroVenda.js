import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setStatusFiltro,
  setClienteFiltro,
  setDataVendaInicialFiltro,
  setDataVendaFinalFiltro,
  limparFiltro,
} from '../../actions/filtrosVendas';
import Form from '../forms/Form';
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { StyledButton, StyledTextField } from '../forms/elements';

const FiltroVenda = () => {
  const dispatch = useDispatch();
  const { status, cliente, dataVendaInicial, dataVendaFinal } = useSelector(
    (state) => state.filtrosVendas
  );

  const handleDispatchData = (value, action) => {
    if (!value?.valueOf()) {
      return;
    }

    dispatch(action(value.valueOf()));
  };

  return (
    <Form>
      <Form.Filtro>
        <Form.Filtro.Title>Filtrar</Form.Filtro.Title>
        <Form.Division>
          <StyledTextField
            data-testid="filtro-cliente"
            type="text"
            value={cliente}
            label="Cliente"
            onChange={(e) => dispatch(setClienteFiltro(e.target.value))}
          />
          <KeyboardDatePicker
            data-testid="filtro-data-inicial"
            autoOk={true}
            format="DD/MM/yyyy"
            label="De"
            value={dataVendaInicial}
            onChange={(e) => handleDispatchData(e, setDataVendaInicialFiltro)}
          />
          <KeyboardDatePicker
            data-testid="filtro-data-final"
            autoOk={true}
            format="DD/MM/yyyy"
            label="Até"
            value={dataVendaFinal}
            onChange={(e) => handleDispatchData(e, setDataVendaFinalFiltro)}
          />
          <FormControl>
            <FormHelperText>Status da Venda</FormHelperText>
            <Select
              data-testid="filtro-status"
              value={status}
              onChange={(e) => dispatch(setStatusFiltro(e.target.value))}
            >
              <MenuItem value="todos">Todas</MenuItem>
              <MenuItem value="em andamento">Em Andamento</MenuItem>
              <MenuItem value="orçamento">Orçamento</MenuItem>
              <MenuItem value="a receber">À Receber</MenuItem>
              <MenuItem value="concluida">Concluído</MenuItem>
              <MenuItem value="cancelada">Canceladas</MenuItem>
            </Select>
          </FormControl>
          <StyledButton onClick={(e) => dispatch(limparFiltro())}>
            Limpar
          </StyledButton>
        </Form.Division>
      </Form.Filtro>
    </Form>
  );
};

export { FiltroVenda as default };
