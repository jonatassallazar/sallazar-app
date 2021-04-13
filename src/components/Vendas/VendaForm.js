import React, { useState, useEffect, useReducer } from 'react';
import VendaFormProdutos from './VendaFormProdutos';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CurrencyFormat from 'react-currency-format';
import { useSelector, useDispatch } from 'react-redux';
import { startSetClientes } from '../../actions/clientes';
import { startSetProdutos } from '../../actions/produtos';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Add from '@material-ui/icons/Add';

let hasPopulated = false;

const VendaForm = (props) => {
  const dispatch = useDispatch();

  const [numero, setNumero] = useState('');
  const [cliente, setCliente] = useState('');
  const [subTotal, setSubTotal] = useState('');
  const [status, setStatus] = useState('Ativo');
  const [total, setTotal] = useState('');
  const [frete, setFrete] = useState('');
  const [desconto, setDesconto] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [dataVenda, setDataVenda] = useState(null);
  const [createdAt, setCreatedAt] = useState(new Date());
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

  //Popula os campos
  if (props.venda && !hasPopulated) {
    setNumero(props.venda.numero);
    setCliente(props.venda.cliente);
    //setProdutos(props.venda.produtos)
    setSubTotal(props.venda.subTotal);
    setStatus(props.venda.status || ['Ativo']);
    setTotal(props.venda.total);
    setFrete(props.venda.frete);
    setDesconto(props.venda.desconto);
    setObservacoes(props.venda.observacoes);
    setDataVenda(props.venda.dataVenda);
    setCreatedAt(props.venda.createdAt);
    hasPopulated = true;
  }

  //Limpa a função de popular os campos
  useEffect(() => {
    return () => {
      hasPopulated = false;
    };
  }, []);

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
    <div>
      <form onSubmit={onSubmit} className="general-form">
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
          startIcon={<SaveIcon />}
        >
          Salvar
        </Button>
      </form>
      {error ? <p>{error}</p> : null}
    </div>
  );
};

export { VendaForm as default };
