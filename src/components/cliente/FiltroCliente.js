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
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { StyledTextField } from '../forms/elements';
import InputMask from 'react-input-mask';

const FiltroCliente = (props) => {
  const dispatch = useDispatch();
  const { nome, email, telefone, sortBy } = useSelector(
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
          <InputMask
            value={telefone}
            onChange={(e) => dispatch(setTelefoneFiltro(e.target.value))}
            mask="(99)99999-9999"
          >
            {(inputProps) => (
              <TextField
                id="standard-basic"
                type="tel"
                label="Telefone"
                {...inputProps}
              />
            )}
          </InputMask>
          <FormControl>
            <FormHelperText>Ordenar</FormHelperText>
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
          </FormControl>
        </Form.Division>
      </Form.Filtro>
    </Form>
  );
};

export { FiltroCliente as default };
