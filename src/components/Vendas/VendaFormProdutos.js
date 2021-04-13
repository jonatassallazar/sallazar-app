import React from 'react';
import { useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CurrencyFormat from 'react-currency-format';
import TextField from '@material-ui/core/TextField';

const VendaFormProdutos = ({ index, produto, dispatchProdutos }) => {
  const produtosLista = useSelector((state) => state.produtos);

  const findProdutoID = (id) => {
    const produtoEcontrado = produtosLista.find((produto) => {
      return produto.id === id;
    });
    return produtoEcontrado;
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Produto</InputLabel>
        <Select
          autoWidth
          className="form-inside-field"
          value={produto.id}
          onChange={(e) => {
            dispatchProdutos({
              type: 'ADD_PRODUTO_INFORMACAO',
              index,
              produto: findProdutoID(e.target.value),
            });
          }}
        >
          {produtosLista.map((produtoItem) => (
            <MenuItem value={produtoItem.id}>{produtoItem.nome}</MenuItem>
          ))}
        </Select>
        <TextField
          className="form-inside-field"
          id="standard-basic"
          label="Unidade"
          value={produto.unidade}
          disabled={true}
        />
        <CurrencyFormat
          className="form-inside-field"
          id="standard-basic"
          label="Quantidade"
          value={produto.quantidade}
          onValueChange={(e) => {
            dispatchProdutos({
              type: 'EDITAR_PRODUTO',
              index,
              quantidade: e.value,
            });
          }}
          thousandSeparator={'.'}
          decimalScale={3}
          decimalSeparator={','}
          customInput={TextField}
          isNumericString={true}
        />
        <CurrencyFormat
          className="form-inside-field"
          id="standard-basic"
          label="Valor de Venda"
          value={produto.valorVenda}
          onValueChange={(e) => {
            dispatchProdutos({
              type: 'EDITAR_PRODUTO',
              index,
              valorVenda: e.value,
            });
          }}
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
          label="Valor Total"
          value={produto.valorTotal}
          disabled={true}
          prefix={'R$'}
          fixedDecimalScale={true}
          thousandSeparator={'.'}
          decimalScale={2}
          decimalSeparator={','}
          customInput={TextField}
        />
      </FormControl>
    </div>
  );
};

export { VendaFormProdutos as default };
