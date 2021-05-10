import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { TextField } from '@material-ui/core';
import moment from 'moment';

const PagamentoForm = ({ index, pagamento, setPagamento, total }) => {
  const [update, setUpdate] = React.useState(false);
  const [error, setError] = React.useState(undefined);

  const handleValorParcela = (e, value) => {
    const newArray = pagamento?.map((i, indexA) => {
      if (indexA !== index) {
        return { ...i };
      }
      return {
        ...i,
        valorParcela: value !== '' ? value : 0,
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

    pagamento.reduce((acc, cur) => {
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

  const handleBlur = (e, value) => {
    if (!value) {
      setError('O campo de parcela não pode estar vazio.');
    } else {
      setError(undefined);
    }
  };

  const handleDataParcela = (e) => {
    const newValue = e;

    const newArray = pagamento?.map((i, indexA) => {
      if (indexA !== 0 && index === 0) {
        return {
          ...i,
          dataParcela: moment(e).add(indexA, 'months'),
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
      <CurrencyTextField
        required
        className="form-item-p"
        label="Valor da Parcela"
        variant="standard"
        currencySymbol="R$"
        outputFormat="string"
        decimalCharacter=","
        digitGroupSeparator="."
        value={pagamento[index].valorParcela}
        onChange={handleValorParcela}
        minimumValue={0}
        onBlur={handleBlur}
        error={!!error}
        helperText={error}
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
