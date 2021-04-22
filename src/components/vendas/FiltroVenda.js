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
            onChange={(e) => {
              dispatch(setClienteFiltro(e.target.value));
            }}
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
            <Select
              value={status}
              onChange={(e) => dispatch(setStatusFiltro(e.target.value))}
            >
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="Em Andamento">Em Andamento</MenuItem>
              <MenuItem value="inativo">Inativo</MenuItem>
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
                  case 'precoasc':
                    return dispatch(sortByValorTotalAsc());
                  case 'precodec':
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
              <MenuItem value="numeroasc">Número Crescente</MenuItem>
              <MenuItem value="numerodec">Número Decrescent</MenuItem>
              <MenuItem value="precoasc">Valor Total Crescente</MenuItem>
              <MenuItem value="precodec">Valor Total Decrescente</MenuItem>
              <MenuItem value="createdatasc">Criado Crescente</MenuItem>
              <MenuItem value="createdatdec">Criado Decrescente</MenuItem>
            </Select>
          </FormControl>
        </Form.Division>
      </Form.Filtro>
    </Form>
  );
};

export { FiltroVenda as default };
