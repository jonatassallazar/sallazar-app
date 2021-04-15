import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmailFiltro,
  setNomeFiltro,
  setTelefoneFiltro,
  sortByNomeAsc,
  sortByNomeDec,
} from '../../actions/filtrosClientes';
import Form from '../forms/Form';
import { Input, Select, MenuItem } from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';

const FiltroCliente = (props) => {
  const dispatch = useDispatch();
  const { nome, email, telefone, sortBy } = useSelector(
    (state) => state.filtrosClientes
  );

  return (
    <Form>
      <Input
        type="text"
        value={nome}
        placeholder="Nome"
        onChange={(e) => {
          dispatch(setNomeFiltro(e.target.value));
        }}
      />
      <Input
        type="text"
        value={email}
        placeholder="Email"
        onChange={(e) => {
          dispatch(setEmailFiltro(e.target.value));
        }}
      />
      <CurrencyFormat
        id="standard-basic"
        label="Telefone"
        value={telefone}
        onValueChange={(e) => dispatch(setTelefoneFiltro(e.value))}
        customInput={Input}
        isNumericString={true}
        format="(##)#####-####"
        mask="_"
      />
      <Select
        value={sortBy}
        onChange={(e) => {
          if (e.target.value === 'nomeasc') {
            dispatch(sortByNomeAsc());
          } else if (e.target.value === 'nomedec') {
            dispatch(sortByNomeDec());
          }
        }}
      >
        <MenuItem value="nomeasc">Crescente</MenuItem>
        <MenuItem value="nomedec">Decrescente</MenuItem>
      </Select>
    </Form>
  );
};

export { FiltroCliente as default };
