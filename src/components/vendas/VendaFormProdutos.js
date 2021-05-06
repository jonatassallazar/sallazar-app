import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import Form from '../forms/Form';
import { StyledButton } from '../forms/elements';

const VendaFormProdutos = (props) => {


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

  const handleNovoProduto = () => {
    props.setModalShow('produto');
  };

  const addProdutoButton = (
    <StyledButton.Borderless
      onMouseDown={(e) => {
        e.stopPropagation();
        handleNovoProduto();
      }}
      title="Clique aqui para criar um novo Produto"
      type="button"
    >
      + adicionar novo produto
    </StyledButton.Borderless>
  );

  return (
    <Form.Item>
      <Autocomplete
        className="form-item-g"
        options={props.produtos.sort((a, b) =>
          a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : -1
        )}
        getOptionLabel={(option) => option.nome}
        value={props.itensVendidos[props.index]}
        onChange={(e, newValue) => props.handleSelectProduto(e, newValue, props.index)}
        renderInput={(inputProps) => (
          <TextField label="Selecione o Produto" {...inputProps} />
        )}
        noOptionsText={addProdutoButton}
      />
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
