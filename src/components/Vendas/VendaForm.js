import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../forms/Form';
import { startSetClientes } from '../../actions/clientes';
import { startSetProdutos } from '../../actions/produtos';
import VendaFormProdutos from './VendaFormProdutos';
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import { Save, Add } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CurrencyFormat from 'react-currency-format';

const baseItem = {
  id: '',
  unidade: '',
  quantidade: '',
  valorVenda: 0,
  valorTotal: 0,
};

const VendaForm = (props) => {
  const dispatch = useDispatch();

  const [numero, setNumero] = useState(props.venda?.numero || '');
  const [status, setStatus] = useState(props.venda?.status || ['Ativo']);
  const [dataVenda, setDataVenda] = useState(props.venda?.dataVenda || null);
  const [cliente, setCliente] = useState(props.venda?.cliente || '');

  const [itensVendidos, setItensVendidos] = useState(
    props.venda?.itensVendidos || [baseItem]
  );

  const [subTotal, setSubTotal] = useState(props.venda?.subTotal || 0);
  const [frete, setFrete] = useState(props.venda?.frete || '');
  const [desconto, setDesconto] = useState(props.venda?.desconto || '');
  const [total, setTotal] = useState(props.venda?.total || '');
  const [observacoes, setObservacoes] = useState(
    props.venda?.observacoes || ''
  );

  const [createdAt] = useState(props.venda?.createdAt || new Date());
  const [error, setError] = useState('');

  //Get recent data
  useEffect(() => {
    dispatch(startSetClientes());
    dispatch(startSetProdutos());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const newValue = itensVendidos.reduce(
      (acc, cur) => acc + cur.valorTotal,
      0
    );

    setSubTotal(newValue);
  }, [itensVendidos]);

  const clientes = useSelector((state) => state.clientes);

  const produtos = useSelector((state) => state.produtos);

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

  return (
    <>
      <Form onSubmit={onSubmit} className="general-form">
        <TextField
          id="standard-basic"
          label="Número"
          required={true}
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          disabled={true}
        />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
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
        <Select value={cliente} onChange={(e) => setCliente(e.target.value)}>
          {clientes?.map((cliente) => (
            <MenuItem value={cliente.id}>{cliente.nome}</MenuItem>
          ))}
        </Select>

        {/* Products listing */}
        {itensVendidos?.map((item, index) => (
          <Form>
            <VendaFormProdutos
              produtos={produtos}
              index={index}
              itensVendidos={itensVendidos}
              setItensVendidos={setItensVendidos}
            />
          </Form>
        ))}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setItensVendidos([...itensVendidos, baseItem])}
        >
          Produto
        </Button>

        <CurrencyFormat
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
