import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ListaItens from '../listas/ListaItens';

const VendaItem = ({ id, numero, cliente, status, total, vendaData }) => {
  const statusTags = {
    Orçamento: 'tag tag-marrom',
    'Em Andamento': 'tag tag-amarela',
    'À Receber': 'tag tag-roxa',
    Concluída: 'tag tag-verde',
  };

  //Format total to brazilian standard
  const totalDecimal = (value) => {
    const newValue = value.toFixed(2).replace('.', ',');
    return newValue;
  };

  return (
      <ListaItens.Item>
        <p>
          <em className={statusTags[status]}>{status}</em>
        </p>
        <p>{numero}</p>
        <Link to={`/vendas/editar/${id}`}>
          <h3>{cliente.nome}</h3>
        </Link>
        <p>{moment(vendaData).format(` DD/MM/YY`)}</p>
        <p>R$ {totalDecimal(total)}</p>
      </ListaItens.Item>
  );
};

export { VendaItem as default };
