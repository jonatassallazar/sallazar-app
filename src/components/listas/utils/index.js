import moment from 'moment';
import statusTags, { displayTags } from '../../../tags';
import { StyledButton } from '../../forms/elements';
import { Delete, Edit } from '@material-ui/icons';

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

export const getAcoes = ({ row }, handleDelete, refDatabase) => {
  const id = row.original.id;

  return (
    <>
      <StyledButton.Link
        to={`/${refDatabase}/editar/${id}`}
        data-testid={`edit-button${row.index}`}
      >
        <StyledButton.OnlyIcon className="primary">
          <Edit />
        </StyledButton.OnlyIcon>
      </StyledButton.Link>
      <StyledButton.OnlyIcon
        data-testid={`delete-button${row.index}`}
        className="secondary"
        onClick={() => handleDelete(id)}
      >
        <Delete />
      </StyledButton.OnlyIcon>
    </>
  );
};
