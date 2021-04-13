import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setStatusFiltro,
  setClienteFiltro,
  setDataVendaInicialFiltro,
  setDataVendaFinalFiltro,
  sortByNomeAsc,
  sortByNomeDec,
  sortByCreatedAtAsc,
  sortByCreatedAtDec,
  sortByValorTotalAsc,
  sortByValorTotalDec,
} from '../../actions/filtrosVendas';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
    <div>
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
          dispatch(setDataVendaInicialFiltro(e));
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
          dispatch(setDataVendaFinalFiltro(e));
        }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Select
        value={status}
        onChange={(e) => dispatch(setStatusFiltro(e.target.value))}
      >
        <MenuItem value="todos">Todos</MenuItem>
        <MenuItem value="ativo">Ativo</MenuItem>
        <MenuItem value="inativo">Inativo</MenuItem>
      </Select>
      <Select
        value={sortBy}
        onChange={(e) => {
          switch (e.target.value) {
            case 'nomeasc':
              return dispatch(sortByNomeAsc());
            case 'nomedec':
              return dispatch(sortByNomeDec());
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
        <MenuItem value="nomeasc">Nome A-Z</MenuItem>
        <MenuItem value="nomedec">Nome Z-A</MenuItem>
        <MenuItem value="precoasc">Valor Total Crescente</MenuItem>
        <MenuItem value="precodec">Valor Total Decrescente</MenuItem>
        <MenuItem value="createdatasc">Criado Crescente</MenuItem>
        <MenuItem value="createdatdec">Criado Decrescente</MenuItem>
      </Select>
    </div>
  );
};

export { FiltroVenda as default };
