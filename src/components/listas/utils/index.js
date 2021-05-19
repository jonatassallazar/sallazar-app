import moment from 'moment';
import statusTags, { displayTags } from '../../../tags';

export function useGetCliente({ value }) {
  return value.nome;
}

export function useGetData({ value }) {
  return moment(value).format(` DD/MM/YY`);
}

export function useGetValorEmReal({ value }) {
  const newValue = parseFloat(value / 100);
  return `R$ ${newValue.toFixed(2).replace('.', ',')}`;
}

export function useGetStatus({ value }) {
  const newValue = value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return <em className={statusTags[newValue]}>{displayTags[newValue]}</em>;
}

export function useGetEndereco({ value }) {
  return `${value.endereco}${value.numero && `, ${value.numero}`}`;
}
