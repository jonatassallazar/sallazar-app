import React from 'react';
import { Link } from 'react-router-dom';
import ListaItens from '../listas/ListaItens';

const ClienteItem = ({ id, nome, telefone }) => (
  <ListaItens.Item>
    <Link to={`/clientes/editar/${id}`}>
      <h3>{nome}</h3>
    </Link>
    <p>{telefone}</p>
  </ListaItens.Item>
);

export { ClienteItem as default };
