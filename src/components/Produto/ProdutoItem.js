import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ProdutoItem = ({ id, nome, valorVenda, status, createdAt }) => (
  <div className="lista-itens">
    <Link to={`/produtos/editar/${id}`}>
      <h3>{nome}</h3>
    </Link>
    <p>
      {status} | R$ {valorVenda} |{moment(createdAt).format(` DD/MM/YY`)}
    </p>
  </div>
);

export { ProdutoItem as default };
