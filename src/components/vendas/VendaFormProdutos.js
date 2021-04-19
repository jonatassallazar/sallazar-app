import React from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControl,
} from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import Form from '../forms/Form';

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
    const newValue = e.target.value;

    if (newValue < 0) {
      return;
    }

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

  const handleValorVenda = (e, value) => {
    const indexMaster = props.index;
    const newValue = value;

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
    <Form.Item>
      <FormControl className="form-item-g">
        <InputLabel id="demo-simple-select-label">Produto</InputLabel>
        <Select
          autoWidth
          value={props.itensVendidos[props.index].id}
          onChange={handleSelectProduto}
        >
          {props.produtos?.map((i) => (
            <MenuItem key={i.id} value={i.id}>{i.nome}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className="form-item-p"
        label="Unidade"
        value={props.itensVendidos[props.index].unidade}
        disabled={true}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        className="form-item-p"
        label="Quantidade"
        variant="standard"
        type="number"
        InputLabelProps={{ shrink: true }}
        value={props.itensVendidos[props.index].quantidade}
        onChange={handleQuantidade}
      />
      <CurrencyTextField
        className="form-item-p"
        label="Valor de Venda"
        variant="standard"
        currencySymbol="R$"
        outputFormat="string"
        decimalCharacter=","
        digitGroupSeparator="."
        value={props.itensVendidos[props.index].valorVenda}
        onChange={handleValorVenda}
      />
      <CurrencyTextField
        className="form-item-p"
        label="Valor Total"
        disabled={true}
        variant="standard"
        currencySymbol="R$"
        outputFormat="string"
        decimalCharacter=","
        digitGroupSeparator="."
        value={props.itensVendidos[props.index].valorTotal}
      />
    </Form.Item>
  );
};

export { VendaFormProdutos as default };
