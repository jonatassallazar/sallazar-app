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
  Input,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { StyledButton } from '../forms/elements';

const FiltroVenda = () => {
  const dispatch = useDispatch();
  const { status, cliente, dataVendaInicial, dataVendaFinal } = useSelector(
    (state) => state.filtrosVendas
  );

  return (
    <Form>
      <Form.Filtro>
        <Form.Filtro.Title>Filtrar</Form.Filtro.Title>
        <Form.Division>
          <Input
            type="text"
            value={cliente}
            placeholder="Cliente"
            onChange={(e) => dispatch(setClienteFiltro(e.target.value))}
          />
          <KeyboardDatePicker
            disableToolbar
            autoOk={true}
            variant="inline"
            format="DD/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="De"
            value={dataVendaInicial}
            onChange={(e) => {
              dispatch(setDataVendaInicialFiltro(e.valueOf()));
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            autoOk={true}
            variant="inline"
            format="DD/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Até"
            value={dataVendaFinal}
            onChange={(e) => {
              dispatch(setDataVendaFinalFiltro(e.valueOf()));
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl>
            <FormHelperText>Status da Venda</FormHelperText>
            <Select
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
