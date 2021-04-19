import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../forms/Form';
import { startSetClientes } from '../../actions/clientes';
import { startSetProdutos } from '../../actions/produtos';
import VendaFormProdutos from './VendaFormProdutos';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { Save, Add } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

const baseItem = {
  id: '',
  unidade: '',
  quantidade: '',
  valorVenda: 0,
  valorTotal: 0,
};

const VendaForm = (props) => {
  const dispatch = useDispatch();

  //Parte base da venda
  const [numero, setNumero] = useState(props.venda?.numero || props.numero);
  const [status, setStatus] = useState(props.venda?.status || 'Em Andamento');
  const [dataVenda, setDataVenda] = useState(props.venda?.dataVenda || null);
  const [cliente, setCliente] = useState(props.venda?.cliente || '');

  //Itens vendidos
  const [itensVendidos, setItensVendidos] = useState(
    props.venda?.itensVendidos || [baseItem]
  );

  //Resumo da Venda
  const [subTotal, setSubTotal] = useState(props.venda?.subTotal || '0');
  const [frete, setFrete] = useState(props.venda?.frete || '0');
  const [desconto, setDesconto] = useState(props.venda?.desconto || '0');
  const [total, setTotal] = useState(props.venda?.total || '');
  const [observacoes, setObservacoes] = useState(
    props.venda?.observacoes || ''
  );

  //States básicos
  const [createdAt] = useState(props.venda?.createdAt || new Date());
  const [error, setError] = useState('');

  useEffect(() => {
    if (!props.venda?.numero) {
      setNumero(props.numero);
    }
    // eslint-disable-next-line
  }, [props.vendas, props.numero]);

  //Get recent data
  useEffect(() => {
    dispatch(startSetClientes());
    dispatch(startSetProdutos());
    // eslint-disable-next-line
  }, []);

  //Calculate the subTotal
  useEffect(() => {
    const newValue = itensVendidos.reduce(
      (acc, cur) => acc + cur.valorTotal,
      0
    );

    setSubTotal(newValue);
  }, [itensVendidos]);

  //Calculate the total amount
  useEffect(() => {
    const newValue = parseInt(subTotal) + parseInt(frete) - parseInt(desconto);

    setTotal(newValue);
  }, [subTotal, desconto, frete]);

  const clientes = useSelector((state) => state.clientes);
  const produtos = useSelector((state) => state.produtos);

  const handleFrete = (e, value) => {
    if (value < 0 || value === '') {
      return setFrete(0);
    }
    setFrete(value);
  };

  const handleDesconto = (e, value) => {
    if (value < 0 || value === '') {
      return setDesconto(0);
    }
    setDesconto(value);
  };

  const handleAddNewItem = () => {
    if (itensVendidos[itensVendidos.length - 1].id === '') {
      setError('Selecione um produto, para adicionar um novo item vendido.');
      return;
    }

    setError('');
    setItensVendidos([...itensVendidos, baseItem]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (itensVendidos[0].id === '') {
      setError('Coloque os Itens vendidos');
      // Set error state equal to 'Please provide description and amount.'
    } else {
      setError('');
      // Clear the error
      props.onSubmit({
        numero,
        cliente,
        itensVendidos,
        dataVenda: dataVenda.valueOf(),
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
        <Form.Division>
          <TextField
            className="form-item-p"
            label="Número da Venda"
            required={true}
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            disabled={true}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              className="form-item-m"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Em Andamento">Em Andamento</MenuItem>
              <MenuItem value="Orçamento">Orçamento</MenuItem>
              <MenuItem value="À Receber">À Receber</MenuItem>
              <MenuItem value="Concluída">Concluída</MenuItem>
            </Select>
          </FormControl>
          <KeyboardDatePicker
            className="form-item-p"
            disableToolbar
            variant="inline"
            format="DD/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Data da Venda"
            value={dataVenda}
            onChange={(e) => setDataVenda(e)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
            <Select
              className="form-item-m"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            >
              {clientes?.map((cliente) => (
                <MenuItem key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Form.Division>
        <Form.Division>
          <Form.List>
            <p>Itens Vendidos</p>
            {/* Itens purchased listing */}
            {itensVendidos?.map((item, index) => (
              <VendaFormProdutos
                key={item.id}
                produtos={produtos}
                index={index}
                itensVendidos={itensVendidos}
                setItensVendidos={setItensVendidos}
              />
            ))}
          </Form.List>
        </Form.Division>
        <Form.Division>
          <Button
            className="form-item-p"
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddNewItem}
          >
            Item
          </Button>
        </Form.Division>
        <Form.Division>
          <CurrencyTextField
            className="form-item-p"
            label="SubTotal"
            disabled={true}
            variant="standard"
            currencySymbol="R$"
            outputFormat="string"
            decimalCharacter=","
            digitGroupSeparator="."
            value={subTotal}
          />
          <CurrencyTextField
            className="form-item-p"
            label="Frete"
            variant="standard"
            currencySymbol="R$"
            outputFormat="string"
            decimalCharacter=","
            digitGroupSeparator="."
            value={frete}
            onChange={handleFrete}
          />
          <CurrencyTextField
            className="form-item-p"
            label="Desconto"
            variant="standard"
            currencySymbol="R$"
            outputFormat="string"
            decimalCharacter=","
            digitGroupSeparator="."
            value={desconto}
            onChange={handleDesconto}
          />
          <CurrencyTextField
            className="form-item-p"
            label="Total"
            disabled={true}
            variant="standard"
            currencySymbol="R$"
            outputFormat="string"
            decimalCharacter=","
            digitGroupSeparator="."
            value={total}
          />
        </Form.Division>
        <Form.Division>
          <TextField
            label="Observações"
            multiline
            rows={4}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </Form.Division>
        {error && <Form.Error>{error}</Form.Error>}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<Save />}
        >
          Salvar
        </Button>
      </Form>
    </>
  );
};

export { VendaForm as default };
