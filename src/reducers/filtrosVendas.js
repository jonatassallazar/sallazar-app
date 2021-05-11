import moment from "moment";

const statePadraoFiltroVendas = {
  cliente: '',
  dataVendaInicial: moment().subtract(90, 'days').valueOf(),
  dataVendaFinal: moment().valueOf(),
  status: 'todos',
};

const filtrosVendasReducer = (state = statePadraoFiltroVendas, action) => {
  switch (action.type) {
    case 'SET_CLIENTE_FILTER':
      return {
        ...state,
        cliente: action.cliente,
      };
      case 'CLEAN_FILTER':
        return {
          cliente: '',
          dataVendaInicial: moment().subtract(90, 'days').valueOf(),
          dataVendaFinal: moment().valueOf(),
          status: 'todos',
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

export default filtrosVendasReducer;