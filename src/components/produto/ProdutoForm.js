import React, { useState } from 'react';
import Form from '../forms/Form';
import { TextField, Select, MenuItem, InputAdornment } from '@material-ui/core';
import { Save, Delete } from '@material-ui/icons';
import { StyledButton, StyledTextField } from '../forms/elements';
import NumberFormat from 'react-number-format';
import { currencyFormatter } from '../forms/utils/numbersFormatters';

const ProdutoForm = (props) => {
  const [nome, setNome] = useState(props.produto?.nome || '');
  const [unidade, setUnidade] = useState(props.produto?.unidade || '');
  const [peso, setPeso] = useState(props.produto?.peso || '');
  const [valorCusto, setValorCusto] = useState(props.produto?.valorCusto || '');
  const [status, setStatus] = useState(props.produto?.status || 'ativo');
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
        <Select
          data-testid="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="ativo">Ativo</MenuItem>
          <MenuItem value="inativo">Inativo</MenuItem>
        </Select>
        <TextField
          data-testid="nome-produto"
          className="form-item-g"
          label="Nome do Produto"
          required={true}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          data-testid="unidade"
          className="form-item-p"
          label="Unidade (Kg, Un, Pct...)"
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
        />
      </Form.Division>
      <Form.Division>
        <NumberFormat
          data-testid="peso"
          className="textfield-align-right form-item-m"
          placeholder="0.000"
          decimalScale={0}
          decimalSeparator=","
          fixedDecimalScale
          thousandSeparator="."
          label="Peso em gramas"
          customInput={StyledTextField}
          value={peso}
          onValueChange={(values) => setPeso(values.floatValue)}
          InputProps={{
            startAdornment: <InputAdornment position="start">g</InputAdornment>,
          }}
        />
        <NumberFormat
          data-testid="preco-custo"
          required
          className="textfield-align-right form-item-m"
          label="Preço de Custo"
          decimalScale={2}
          decimalSeparator=","
          fixedDecimalScale
          thousandSeparator="."
          placeholder="0,00"
          customInput={StyledTextField}
          value={valorCusto}
          onValueChange={(values) => setValorCusto(values.floatValue)}
          format={currencyFormatter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />
        <NumberFormat
          data-testid="valor-venda"
          required
          className="textfield-align-right form-item-m"
          label="Valor de Venda"
          decimalScale={2}
          decimalSeparator=","
          fixedDecimalScale
          placeholder="0,00"
          thousandSeparator="."
          customInput={StyledTextField}
          value={valorVenda}
          onValueChange={(values) => setValorVenda(values.floatValue)}
          format={currencyFormatter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />
        <TextField
          data-testid="fornecedor"
          className="form-item-g"
          label="Fornecedor"
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
        />
      </Form.Division>
      {error && <p>{error}</p>}
      <Form.Actions>
        <StyledButton
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<Save />}
        >
          Salvar
        </StyledButton>
        {props.handleDelete && (
          <StyledButton.Secundary
            variant="contained"
            color="secondary"
            startIcon={<Delete />}
            onClick={props.handleDelete}
          >
            Remover
          </StyledButton.Secundary>
        )}
      </Form.Actions>
    </Form>
  );
};

export { ProdutoForm as default };
