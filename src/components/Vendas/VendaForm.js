import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../forms/Form';
import { startSetClientes } from '../../actions/clientes';
import { startSetProdutos } from '../../actions/produtos';
import VendaFormProdutos from './VendaFormProdutos';
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import { Save, Add } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CurrencyFormat from 'react-currency-format';

const VendaForm = (props) => {
  const dispatch = useDispatch();

  const [numero, setNumero] = useState(props.venda?.numero || '');
  const [cliente, setCliente] = useState(props.venda?.cliente || '');
  const [subTotal, setSubTotal] = useState(props.venda?.subTotal || '');
  const [status, setStatus] = useState(props.venda?.status || ['Ativo']);
  const [total, setTotal] = useState(props.venda?.total || '');
  const [frete, setFrete] = useState(props.venda?.frete || '');
  const [desconto, setDesconto] = useState(props.venda?.desconto || '');
  const [observacoes, setObservacoes] = useState(
    props.venda?.observacoes || ''
  );
  const [dataVenda, setDataVenda] = useState(props.venda?.dataVenda || null);
  const [createdAt] = useState(props.venda?.createdAt || new Date());
  const [error, setError] = useState('');

  const initialStateProduto = [
    {
      id: '',
      nome: '',
      unidade: '',
      quantidade: '',
      valorVenda: '',
      valorTotal: '',
    },
  ];

  const reducerProdutos = (state, action) => {
    switch (action.type) {
      case 'ADD_PRODUTO':
        return [
          ...state,
          {
            id: '',
            nome: '',
            unidade: '',
            quantidade: '',
            valorVenda: '',
            valorTotal: '',
          },
        ];
      case 'ADD_PRODUTO_INFORMACAO':
        const {
          id = '',
          nome,
          unidade,
          quantidade = 1,
          valorVenda,
          valorTotal = quantidade * valorVenda,
        } = action.produto;

        return state.map((produto, index) => {
          if (index === action.index) {
            return {
              ...produto,
              ...{
                id,
                nome,
                unidade,
                quantidade,
                valorVenda,
                valorTotal,
              },
            };
          } else {
            return produto;
          }
        });
      case 'REMOVER_PRODUTO':
        return state.filter(({ id }) => id !== action.produto.id);
      case 'EDITAR_PRODUTO':
        return state.map((produto, index) => {
          if (index === action.index) {
            let {
              quantidade = produto.quantidade,
              valorVenda = produto.valorVenda,
              valorTotal = produto.valorTotal,
            } = action;

            if (
              produto.quantidade !== quantidade ||
              produto.valorVenda !== valorVenda
            ) {
              valorTotal = quantidade * valorVenda;
            }

            return {
              ...produto,
              ...{
                quantidade,
                valorVenda,
                valorTotal,
              },
            };
          } else {
            return produto;
          }
        });
      default:
        return state;
    }
  };

  const [state, dispatchProdutos] = useReducer(
    reducerProdutos,
    initialStateProduto
  );

  useEffect(() => {
    dispatch(startSetClientes());
    dispatch(startSetProdutos());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSubTotal(() => {
      const subTotalProdutos = state.reduce(
        (acumulador, produto) => acumulador + produto.valorTotal,
        0
      );
      return subTotalProdutos;
    });
  }, [state]);

  const clientes = useSelector((state) => state.clientes);

  const onSubmit = (e) => {
    e.preventDefault();

    if (true) {
      setError('Coloque os Produtos');
      // Set error state equal to 'Please provide description and amount.'
    } else {
      setError('');
      // Clear the error
      props.onSubmit({
        numero,
        cliente,
        //produto: state.produto,
        dataVenda,
        status,
        observacoes,
        subTotal,
        total,
        desconto,
        frete,
        createdAt: createdAt.valueOf(),
      });
    }
  };

  // const onChangeQuantidade = () => {
  //     if (!produtos[0]) {
  //         return null
  //     }
  //     const soma = produtos[0].valorVenda * produtos[0].quantidade

  //     produtos.map((produto) => {
  //         if (produto.id === produtos[0].id) {
  //             return produtos[0].valorTotal = soma
  //         }
  //     })
  // }

  return (
    <>
      <Form onSubmit={onSubmit} className="general-form">
        <TextField
          className="form-inside-field"
          id="standard-basic"
          label="Número"
          required={true}
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          disabled={true}
        />
        <Select
          className="form-inside-field"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="Ativo">Ativo</MenuItem>
          <MenuItem value="Inativo">Inativo</MenuItem>
        </Select>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="DD/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="De"
          value={dataVenda}
          onChange={(e) => setDataVenda(e)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Select
          className="form-inside-field"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        >
          {clientes.map((cliente) => (
            <MenuItem value={cliente.id}>{cliente.nome}</MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => {
            dispatchProdutos({ type: 'ADD_PRODUTO' });
          }}
        >
          Produto
        </Button>
        {state.map((produto, index) => (
          <VendaFormProdutos
            index={index}
            produto={produto}
            dispatchProdutos={dispatchProdutos}
          />
        ))}
        <CurrencyFormat
          className="form-inside-field"
          id="standard-basic"
          label="Sub-Total"
          value={subTotal}
          disabled={true}
          prefix={'R$'}
          thousandSeparator={'.'}
          decimalScale={2}
          fixedDecimalScale={true}
          decimalSeparator={','}
          customInput={TextField}
        />
        <CurrencyFormat
          className="form-inside-field"
          id="standard-basic"
          label="Frete"
          value={frete}
          onValueChange={(e) => setFrete(e.value)}
          prefix={'R$'}
          thousandSeparator={'.'}
          decimalScale={2}
          fixedDecimalScale={true}
          decimalSeparator={','}
          customInput={TextField}
          isNumericString={true}
        />
        <CurrencyFormat
          className="form-inside-field"
          id="standard-basic"
          label="Desconto"
          value={desconto}
          onValueChange={(e) => setDesconto(e.value)}
          prefix={'R$'}
          thousandSeparator={'.'}
          decimalScale={2}
          fixedDecimalScale={true}
          decimalSeparator={','}
          customInput={TextField}
          isNumericString={true}
        />
        <CurrencyFormat
          className="form-inside-field"
          id="standard-basic"
          label="Total"
          value={total}
          onValueChange={(e) => setTotal(e.value)}
          prefix={'R$'}
          thousandSeparator={'.'}
          decimalScale={2}
          fixedDecimalScale={true}
          decimalSeparator={','}
          customInput={TextField}
          isNumericString={true}
        />
        <TextField
          className="form-inside-field"
          id="standard-basic"
          label="Observações"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<Save />}
        >
          Salvar
        </Button>
      </Form>
      {error ? <p>{error}</p> : null}
    </>
  );
};

export { VendaForm as default };
