import React, { useState } from 'react';
import Form from '../forms/Form';
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import { Save, Delete } from '@material-ui/icons';
import CurrencyFormat from 'react-currency-format';

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
    <>
      <Form onSubmit={onSubmit}>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value="Ativo">Ativo</MenuItem>
          <MenuItem value="Inativo">Inativo</MenuItem>
        </Select>
        <TextField
          id="standard-basic"
          label="Nome do Produto"
          required={true}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Unidade"
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
        />
        <CurrencyFormat
          id="standard-basic"
          label="Peso"
          value={peso}
          onValueChange={(e) => setPeso(e.value)}
          suffix={'g'}
          thousandSeparator={'.'}
          decimalScale={2}
          decimalSeparator={','}
          customInput={TextField}
          isNumericString={true}
        />
        <CurrencyFormat
          id="standard-basic"
          label="Preço de Custo"
          value={valorCusto}
          onValueChange={(e) => setValorCusto(e.value)}
          prefix={'R$'}
          thousandSeparator={'.'}
          decimalScale={2}
          fixedDecimalScale={true}
          decimalSeparator={','}
          customInput={TextField}
          isNumericString={true}
        />
        <CurrencyFormat
          id="standard-basic"
          label="Valor de Venda"
          value={valorVenda}
          onValueChange={(e) => setValorVenda(e.value)}
          prefix={'R$'}
          thousandSeparator={'.'}
          decimalScale={2}
          fixedDecimalScale={true}
          decimalSeparator={','}
          customInput={TextField}
          isNumericString={true}
        />
        <TextField
          id="standard-basic"
          label="Fornecedor"
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
        />
      </Form>
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
      {error ? <p>{error}</p> : null}
    </>
  );
};

export { ProdutoForm as default };
