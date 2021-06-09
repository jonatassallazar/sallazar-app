import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { InputAdornment, TextField } from '@material-ui/core';
import moment from 'moment';
import { currencyFormatter } from '../forms/utils/numbersFormatters';
import NumberFormat from 'react-number-format';
import { Clear } from '@material-ui/icons';
import { StyledButton } from '../forms/elements';

const PagamentoForm = ({ index, pagamento, setPagamento, total }) => {
  const [update, setUpdate] = React.useState(false);
  const [error, setError] = React.useState(undefined);

  const handleValorParcela = ({ floatValue }) => {
    const newArray = pagamento?.map((i, indexA) => {
      if (indexA !== index) {
        return { ...i };
      }
      return {
        ...i,
        valorParcela: floatValue,
      };
    });

    setPagamento(newArray);
    setUpdate(true);
  };

  const handleInseridoManualmente = () => {
    const newArray = pagamento?.map((i, indexA) => {
      if (indexA !== index) {
        return { ...i };
      }
      return {
        ...i,
        inseridoManualmente: true,
      };
    });

    setPagamento(newArray);
  };

  const handleInseridoManualmenteFalse = () => {
    const newArray = pagamento?.map((i, indexA) => {
      if (indexA !== index) {
        return { ...i };
      }
      return {
        ...i,
        inseridoManualmente: false,
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
        sumValueManual = acc + cur.valorParcela || 0;
      } else {
        sumQntdParcela = sumQntdParcela + 1;
        sumValueAuto = acc + cur.valorParcela || 0;
      }
      return sumValueManual + sumValueAuto;
    }, 0);

    if (sumValueManual > total) {
      setError('O valor da parcela não pode exceder o total.');
    } else {
      setError(undefined);
    }

    if (valorTotalParcelas < total) {
      console.log(valorTotalParcelas, total);
      setError('O valor da parcela é menor do que o valor total da compra');
    } else {
      setError(undefined);
    }

    const valorDividido = Math.round((total - sumValueManual) / sumQntdParcela);
    const valorRestante = (total - sumValueManual) % sumQntdParcela;

    const newArray = pagamento?.map((i, index, arr) => {
      if (!i.inseridoManualmente && index === arr.length - 1) {
        return {
          ...i,
          valorParcela: valorDividido < 0 ? 0 : valorDividido + valorRestante,
        };
      } else if (!i.inseridoManualmente && index !== pagamento.lenght - 1) {
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
    if (!e?.valueOf()) {
      return;
    }

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
        data-testid="numero-parcela"
        className="form-item-p"
        label="Nº da Parcela"
        required={true}
        value={pagamento[index].numeroParcela}
        disabled={true}
      />
      <NumberFormat
        data-testid="valor-parcela"
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
        onFocus={handleInseridoManualmente}
        onValueChange={handleValorParcela}
        format={currencyFormatter}
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          endAdornment: (
            <StyledButton.OnlyIcon title="Clique aqui para calcular automaticamente o valor">
              <Clear onClick={handleInseridoManualmenteFalse} />
            </StyledButton.OnlyIcon>
          ),
        }}
      />
      <KeyboardDatePicker
        required
        data-testid="data-parcela"
        autoOk={true}
        className="form-item-p"
        format="DD/MM/yyyy"
        label="Data do Pagamento"
        value={pagamento[index].dataParcela}
        onChange={handleDataParcela}
      />
    </>
  );
};

export default PagamentoForm;
