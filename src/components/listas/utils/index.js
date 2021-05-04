import moment from 'moment';
import statusTags from '../../../tags';

export function useGetCliente({ value }) {
  return value.nome;
}

export function useGetData({ value }) {
  return moment(value).format(` DD/MM/YY`);
}

export function useGetValorEmReal({ value }) {
  const newValue = parseFloat(value);
  return `R$ ${newValue.toFixed(2).replace('.', ',')}`;
}

export function useGetStatus({ value }) {
  return <em className={statusTags[value]}>{value}</em>;
}

export function useGetEndereco({ value }) {
  return `${value.endereco}${value.numero && `, ${value.numero}`}`;
}