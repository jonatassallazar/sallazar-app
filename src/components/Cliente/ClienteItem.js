import React from 'react';
import { Link } from 'react-router-dom';

const ClienteItem = ({ id, nome, telefone }) => (
  <div className="lista-itens">
    <Link to={`/clientes/editar/${id}`}>
      <h3>{nome}</h3>
    </Link>
    <p>{telefone}</p>
  </div>
);

export { ClienteItem as default };
