import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ListaItens from '../listas/ListaItens';

const VendaItem = ({ id, numero, total, status, vendaData, cliente }) => (
  <ListaItens.Item>
    <Link to={`/vendas/editar/${id}`}>
      <h3>{numero | cliente}</h3>
    </Link>
    <p>
      {status} | {total} |{moment(vendaData).format(` DD/MM/YY`)}
    </p>
  </ListaItens.Item>
);

export { VendaItem as default };
