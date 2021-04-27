import moment from "moment";

const statePadraoFiltroVendas = {
  cliente: '',
  dataVendaInicial: moment().subtract(90, 'days').valueOf(),
  dataVendaFinal: moment().valueOf(),
  status: 'todos',
  sortBy: 'numerodec',
};

export default (state = statePadraoFiltroVendas, action) => {
  switch (action.type) {
    case 'SET_CLIENTE_FILTER':
      return {
        ...state,
        cliente: action.cliente,
      };
    case 'SORT_BY_NUMERO_ASC':
      return {
        ...state,
        sortBy: 'numeroasc',
      };
    case 'SORT_BY_NUMERO_DEC':
      return {
        ...state,
        sortBy: 'numerodec',
      };
      case 'SORT_BY_DATAVENDA_ASC':
        return {
          ...state,
          sortBy: 'datavendaasc',
        };
      case 'SORT_BY_DATAVENDA_DEC':
        return {
          ...state,
          sortBy: 'datavendadec',
        };
    case 'SORT_BY_VALORTOTAL_ASC':
      return {
        ...state,
        sortBy: 'totalasc',
      };
    case 'SORT_BY_VALORTOTAL_DEC':
      return {
        ...state,
        sortBy: 'totaldec',
      };
    case 'SORT_BY_CREATEDAT_ASC':
      return {
        ...state,
        sortBy: 'createdatasc',
      };
    case 'SORT_BY_CREATEDAT_DEC':
      return {
        ...state,
        sortBy: 'createdatdec',
      };
    case 'SET_STATUS_FILTER':
      return {
        ...state,
        status: action.status,
      };
    case 'SET_DATAVENDA_INICIAL_FILTER':
      return {
        ...state,
        dataVendaInicial: action.dataVendaInicial,
      };
    case 'SET_DATAVENDA_FINAL_FILTER':
      return {
        ...state,
        dataVendaFinal: action.dataVendaFinal,
      };
    default:
      return state;
  }
};
