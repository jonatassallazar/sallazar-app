import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { InputAdornment, TextField } from '@material-ui/core';
import moment from 'moment';
import {currencyFormatter} from '../forms/utils/currencyFormatter';
import NumberFormat from 'react-number-format';

const PagamentoForm = ({ index, pagamento, setPagamento, total }) => {
  const [update, setUpdate] = React.useState(false);
  const [error, setError] = React.useState(undefined);

  const handleValorParcela = (values) => {
    const newArray = pagamento?.map((i, indexA) => {
      if (indexA !== index) {
        return { ...i };
      }
      return {
        ...i,
        valorParcela: values.floatValue !== '' ? values.floatValue : 0,
        inseridoManualmente: true,
      };
    });

    setPagamento(newArray);
    setUpdate(true);
  };

  const getValorParcelasRestantes = () => {
    let sumValueManual = 0;
    let sumValueAuto = 0;
    let sumQntdParcela = 0;

    const valorTotalParcelas = pagamento.reduce((acc, cur) => {
      if (cur.inseridoManualmente) {
        sumValueManual =
          acc + parseFloat(cur.valorParcela !== '' ? cur.valorParcela : 0);
      } else {
        sumQntdParcela = sumQntdParcela + 1;
        sumValueAuto =
          acc + parseFloat(cur.valorParcela !== '' ? cur.valorParcela : 0);
      }
      return sumValueManual + sumValueAuto;
    }, 0);

    if (sumValueManual > total) {
      setError('O valor da parcela não pode exceder o total.');
    } else {
      setError(undefined);
    }

    if (valorTotalParcelas < total) {
      setError('O valor da parcela é menor do que o valor total da compra');
    } else {
      setError(undefined);
    }

    const valorDividido = (total - sumValueManual) / sumQntdParcela;

    const newArray = pagamento?.map((i) => {
      if (!i.inseridoManualmente) {
        return { ...i, valorParcela: valorDividido < 0 ? 0 : valorDividido };
      } else {
        return { ...i };
      }
    });
    setPagamento(newArray);
  };

  React.useEffect(() => {
    if (update) {
      getValorParcelasRestantes();
      setUpdate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagamento]);

  const handleDataParcela = (e) => {
    const newValue = e;

    const newArray = pagamento?.map((i, indexA) => {
      if (indexA !== 0 && index === 0) {
        return {
          ...i,
          dataParcela: moment(e).add(indexA, 'months').valueOf(),
        };
      } else if (index === 0) {
        return {
          ...i,
          dataParcela: newValue.valueOf(),
        };
      } else if (indexA === index) {
        return { ...i, dataParcela: newValue.valueOf() };
      } else {
        return { ...i };
      }
    });

    setPagamento(newArray);
  };

  return (
    <>
      <TextField
        className="form-item-p"
        label="Nº da Parcela"
        required={true}
        value={pagamento[index].numeroParcela}
        disabled={true}
      />
      <NumberFormat
        required
        className="textfield-align-right"
        label="Valor da Parcela"
        decimalScale={2}
        decimalSeparator=","
        fixedDecimalScale
        placeholder="0,00"
        thousandSeparator="."
        customInput={TextField}
        value={pagamento[index].valorParcela}
        onValueChange={handleValorParcela}
        format={currencyFormatter}
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
      />
      <KeyboardDatePicker
        required
        autoOk={true}
        className="form-item-p"
        disableToolbar
        variant="inline"
        format="DD/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Data do Pagamento"
        value={pagamento[index].dataParcela}
        onChange={handleDataParcela}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
};

export default PagamentoForm;
