import React from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControl,
} from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';

const VendaFormProdutos = (props) => {
  const handleSelectProduto = (e) => {
    const indexMaster = props.index;
    const newID = e.target.value;

    const produtoSelecionado = props.produtos?.find((i) => i.id === newID);

    const newArray = props.itensVendidos?.map((i, index) => {
      if (index !== indexMaster) {
        return { ...i };
      }
      return {
        ...i,
        id: newID,
        unidade: produtoSelecionado?.unidade,
        quantidade: 1,
        valorVenda: produtoSelecionado?.valorVenda,
        valorTotal: produtoSelecionado?.valorVenda * 1,
      };
    });

    props.setItensVendidos(newArray);
  };

  const handleQuantidade = (e) => {
    const indexMaster = props.index;
    const newValue = e.value;

    const newArray = props.itensVendidos?.map((i, index) => {
      if (index !== indexMaster) {
        return { ...i };
      }
      return {
        ...i,
        quantidade: newValue,
        valorTotal: i.valorVenda * newValue,
      };
    });

    props.setItensVendidos(newArray);
  };

  const handleValorVenda = (e) => {
    const indexMaster = props.index;
    const newValue = e.value;

    const newArray = props.itensVendidos?.map((i, index) => {
      if (index !== indexMaster) {
        return { ...i };
      }
      return {
        ...i,
        valorVenda: newValue,
        valorTotal: i.quantidade * newValue,
      };
    });

    props.setItensVendidos(newArray);
  };

  return (
    <>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Produto</InputLabel>
        <Select
          autoWidth
          value={props.itensVendidos[props.index].id}
          onChange={handleSelectProduto}
        >
          {props.produtos?.map((i) => (
            <MenuItem value={i.id}>{i.nome}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="standard-basic"
        label="Unidade"
        value={props.itensVendidos[props.index].unidade}
        disabled={true}
        InputLabelProps={{ shrink: true }}
      />
      <CurrencyFormat
        id="standard-basic"
        label="Quantidade"
        value={props.itensVendidos[props.index].quantidade}
        onValueChange={handleQuantidade}
        thousandSeparator={'.'}
        decimalScale={3}
        decimalSeparator={','}
        customInput={TextField}
        isNumericString={true}
      />
      <CurrencyFormat
        id="standard-basic"
        label="Valor de Venda"
        value={props.itensVendidos[props.index].valorVenda}
        onValueChange={handleValorVenda}
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
        label="Valor Total"
        value={props.itensVendidos[props.index].valorTotal}
        disabled={true}
        prefix={'R$'}
        fixedDecimalScale={true}
        thousandSeparator={'.'}
        decimalScale={2}
        decimalSeparator={','}
        customInput={TextField}
      />
    </>
  );
};

export { VendaFormProdutos as default };
