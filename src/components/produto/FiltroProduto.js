import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFornecedorFiltro,
  setNomeFiltro,
  setStatusFiltro,
} from '../../actions/filtrosProdutos';
import Form from '../forms/Form';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@material-ui/core';

const FiltroProduto = () => {
  const dispatch = useDispatch();
  const { nome, fornecedor, status } = useSelector(
    (state) => state.filtrosProdutos
  );

  return (
    <Form>
      <Form.Filtro>
        <Form.Filtro.Title>Filtrar</Form.Filtro.Title>
        <Form.Division>
          <TextField
            type="text"
            value={nome}
            label="Nome"
            onChange={(e) => {
              dispatch(setNomeFiltro(e.target.value));
            }}
          />
          <TextField
            type="text"
            value={fornecedor}
            label="Fornecedor"
            onChange={(e) => {
              dispatch(setFornecedorFiltro(e.target.value));
            }}
          />
          <FormControl>
            <FormHelperText>Status do Produto</FormHelperText>
            <Select
              value={status}
              onChange={(e) => dispatch(setStatusFiltro(e.target.value))}
            >
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="ativo">Ativo</MenuItem>
              <MenuItem value="inativo">Inativo</MenuItem>
            </Select>
          </FormControl>
        </Form.Division>
      </Form.Filtro>
    </Form>
  );
};

export { FiltroProduto as default };
