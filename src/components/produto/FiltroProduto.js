import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFornecedorFiltro,
  setNomeFiltro,
  setStatusFiltro,
  sortByNomeAsc,
  sortByNomeDec,
  sortByCreatedAtAsc,
  sortByCreatedAtDec,
  sortByPrecoAsc,
  sortByPrecoDec,
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
  const { nome, fornecedor, status, sortBy } = useSelector(
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
          <FormControl>
            <FormHelperText>Ordenar</FormHelperText>
            <Select
              value={sortBy}
              onChange={(e) => {
                switch (e.target.value) {
                  case 'nomeasc':
                    return dispatch(sortByNomeAsc());
                  case 'nomedec':
                    return dispatch(sortByNomeDec());
                  case 'precoasc':
                    return dispatch(sortByPrecoAsc());
                  case 'precodec':
                    return dispatch(sortByPrecoDec());
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
              <MenuItem value="precoasc">Preço Crescente</MenuItem>
              <MenuItem value="precodec">Preço Decrescente</MenuItem>
              <MenuItem value="createdatasc">Criado Crescente</MenuItem>
              <MenuItem value="createdatdec">Criado Decrescente</MenuItem>
            </Select>
          </FormControl>
        </Form.Division>
      </Form.Filtro>
    </Form>
  );
};

export { FiltroProduto as default };
