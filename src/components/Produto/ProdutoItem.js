import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ListaItens from '../Listas/ListaItens';

const ProdutoItem = ({ id, nome, valorVenda, status, createdAt }) => (
  <ListaItens.Item>
    <Link to={`/produtos/editar/${id}`}>
      <h3>{nome}</h3>
    </Link>
    <p>
      {status} | R$ {valorVenda} |{moment(createdAt).format(` DD/MM/YY`)}
    </p>
  </ListaItens.Item>
);

export { ProdutoItem as default };
