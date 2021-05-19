import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Form from '../forms/Form';
import { StyledButton } from '../forms/elements';
import { currencyFormatter } from '../forms/utils/numbersFormatters';
import NumberFormat from 'react-number-format';

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

  const handleValorVenda = (values) => {
    const indexMaster = props.index;
    const newValue = values.floatValue;

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
        loading={props.produtos?.length === 0}
        options={props.produtos?.sort((a, b) =>
          a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : -1
        )}
        getOptionLabel={(option) => option.nome || ''}
        value={props.itensVendidos[props.index]}
        getOptionSelected={(option, value) => option.value === value.value}
        onChange={(e, newValue) =>
          props.handleSelectProduto(e, newValue, props.index)
        }
        renderInput={(inputProps) => (
          <TextField label="Selecione o Produto" {...inputProps} />
        )}
        noOptionsText={addProdutoButton}
      />
      <TextField
        required
        className="form-item-p"
        label="Unidade"
        value={props.itensVendidos[props.index].unidade}
        disabled={true}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        required
        className="form-item-p"
        label="Quantidade"
        variant="standard"
        type="number"
        InputLabelProps={{ shrink: true }}
        value={props.itensVendidos[props.index].quantidade}
        onChange={handleQuantidade}
      />
      <NumberFormat
        required
        className="textfield-align-right form-item-p"
        label="Valor Unitário"
        decimalScale={2}
        decimalSeparator=","
        fixedDecimalScale
        placeholder="0,00"
        thousandSeparator="."
        customInput={TextField}
        value={props.itensVendidos[props.index].valorVenda}
        onValueChange={handleValorVenda}
        format={currencyFormatter}
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
      />
      <NumberFormat
        required
        className="textfield-align-right form-item-p"
        label="Valor Total"
        decimalScale={2}
        decimalSeparator=","
        fixedDecimalScale
        placeholder="0,00"
        thousandSeparator="."
        customInput={TextField}
        value={props.itensVendidos[props.index].valorTotal}
        format={currencyFormatter}
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
      />
    </Form.Item>
  );
};

export { VendaFormProdutos as default };
