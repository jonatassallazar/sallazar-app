import React, { useState } from 'react';
import Form from '../forms/Form';
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import { Save, Delete } from '@material-ui/icons';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

const ProdutoForm = (props) => {
  const [nome, setNome] = useState(props.produto?.nome || '');
  const [unidade, setUnidade] = useState(props.produto?.unidade || '');
  const [peso, setPeso] = useState(props.produto?.peso || '');
  const [valorCusto, setValorCusto] = useState(props.produto?.valorCusto || '');
  const [status, setStatus] = useState(props.produto?.status || ['Ativo']);
  const [valorVenda, setValorVenda] = useState(props.produto?.valorVenda || '');
  const [fornecedor, setFornecedor] = useState(props.produto?.fornecedor || '');
  const [createdAt] = useState(props.produto?.createdAt || new Date());
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!nome) {
      setError('Digite um nome para o Produto');
      // Set error state equal to 'Please provide description and amount.'
    } else {
      setError('');
      // Clear the error
      props.onSubmit({
        nome,
        unidade,
        peso,
        valorCusto,
        status,
        valorVenda,
        fornecedor,
        createdAt: createdAt.valueOf(),
      });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Division>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value="Ativo">Ativo</MenuItem>
          <MenuItem value="Inativo">Inativo</MenuItem>
        </Select>
        <TextField
          className="form-item-g"
          label="Nome do Produto"
          required={true}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          className="form-item-p"
          label="Unidade (Kg, Un, Pct...)"
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
        />
      </Form.Division>
      <Form.Division>
        <CurrencyTextField
          variant="standard"
          currencySymbol="g"
          outputFormat="string"
          decimalCharacter=","
          digitGroupSeparator="."
          decimalPlaces="0"
          className="form-item-m"
          label="Peso em gramas"
          value={peso}
          onChange={(e, value) => setPeso(value)}
        />
        <CurrencyTextField
          className="form-item-m"
          variant="standard"
          label="Preço de Custo"
          value={valorCusto}
          onChange={(e, value) => setValorCusto(value)}
          currencySymbol="R$"
          outputFormat="string"
          decimalCharacter=","
          digitGroupSeparator="."
        />
        <CurrencyTextField
          className="form-item-m"
          variant="standard"
          label="Valor de Venda"
          value={valorVenda}
          onChange={(e, value) => setValorVenda(value)}
          currencySymbol="R$"
          outputFormat="string"
          decimalCharacter=","
          digitGroupSeparator="."
        />
        <TextField
          className="form-item-g"
          label="Fornecedor"
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
        />
      </Form.Division>
      {error && <p>{error}</p>}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        startIcon={<Save />}
      >
        Salvar
      </Button>
      {props.handleDelete && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Delete />}
          onClick={props.handleDelete}
        >
          Remove
        </Button>
      )}
    </Form>
  );
};

export { ProdutoForm as default };
