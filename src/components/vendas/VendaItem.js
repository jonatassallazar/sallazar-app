import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ListaItens from '../listas/ListaItens';

const VendaItem = ({ id, numero, cliente, status, total, vendaData, itensVendidos }) => (
  <ListaItens.Item>
    <Link to={`/vendas/editar/${id}`}>
      <h3>{}</h3>
    <p>
      Número da Venda: {numero} | Status: {status} | Cesta de Compras: {itensVendidos.length} | Data da Venda:{moment(vendaData).format(` DD/MM/YY`)} | Total: {total}
    </p>
    </Link>
  </ListaItens.Item>
);

export { VendaItem as default };
