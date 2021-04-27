import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setStatusFiltro,
  setClienteFiltro,
  setDataVendaInicialFiltro,
  setDataVendaFinalFiltro,
  sortByNumeroAsc,
  sortByNumeroDec,
  sortByCreatedAtAsc,
  sortByCreatedAtDec,
  sortByValorTotalAsc,
  sortByValorTotalDec,
  sortByDataVendaAsc,
  sortByDataVendaDec,
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

const FiltroVenda = () => {
  const dispatch = useDispatch();
  const {
    status,
    sortBy,
    cliente,
    dataVendaInicial,
    dataVendaFinal,
  } = useSelector((state) => state.filtrosVendas);


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
            <Select value={status} onChange={(e) => dispatch(setStatusFiltro(e.target.value))}>
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="em andamento">Em Andamento</MenuItem>
              <MenuItem value="orçamento">Orçamento</MenuItem>
              <MenuItem value="a receber">À Receber</MenuItem>
              <MenuItem value="concluida">Concluído</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <FormHelperText>Ordenar</FormHelperText>
            <Select
              value={sortBy}
              onChange={(e) => {
                switch (e.target.value) {
                  case 'numeroasc':
                    return dispatch(sortByNumeroAsc());
                  case 'numerodec':
                    return dispatch(sortByNumeroDec());
                  case 'datavendaasc':
                    return dispatch(sortByDataVendaAsc());
                  case 'datavendadec':
                    return dispatch(sortByDataVendaDec());
                  case 'totalasc':
                    return dispatch(sortByValorTotalAsc());
                  case 'totaldec':
                    return dispatch(sortByValorTotalDec());
                  case 'createdatasc':
                    return dispatch(sortByCreatedAtAsc());
                  case 'createdatdec':
                    return dispatch(sortByCreatedAtDec());
                  default:
                    break;
                }
              }}
            >
              <MenuItem value="numeroasc">Número ↓</MenuItem>
              <MenuItem value="numerodec">Número ↑</MenuItem>
              <MenuItem value="datavendaasc">Data da Venda ↓</MenuItem>
              <MenuItem value="datavendadec">Data da Venda ↑</MenuItem>
              <MenuItem value="totalasc">Valor Total ↓</MenuItem>
              <MenuItem value="totaldec">Valor Total ↑</MenuItem>
              <MenuItem value="createdatasc">Criado ↓</MenuItem>
              <MenuItem value="createdatdec">Criado ↑</MenuItem>
            </Select>
          </FormControl>
        </Form.Division>
      </Form.Filtro>
    </Form>
  );
};

export { FiltroVenda as default };
