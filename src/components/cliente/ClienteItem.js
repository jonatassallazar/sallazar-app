import React from 'react';
import { Link } from 'react-router-dom';
import ListaItens from '../listas/ListaItens';
import statusTags from '../../tags';

const ClienteItem = ({
  status,
  id,
  nome,
  telefone,
  email,
  enderecoCompleto,
}) => (
  <ListaItens.Item>
    <p>
      <em className={statusTags[status]}>{status}</em>
    </p>
    <Link to={`/clientes/editar/${id}`}>
      <h3>{nome}</h3>
    </Link>
    <p>{telefone ? telefone : '-'}</p>
    <p>{email ? email : '-'}</p>
    <p>
      {enderecoCompleto?.endereco ? enderecoCompleto?.endereco : '-'}
      {enderecoCompleto?.numero && `, ${enderecoCompleto?.numero}`}{' '}
    </p>
  </ListaItens.Item>
);

export { ClienteItem as default };
