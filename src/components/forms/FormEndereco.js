import React from 'react';
import TextField from '@material-ui/core/TextField';
import cep from 'cep-promise';
import Form from './Form';
import NumberFormat from 'react-number-format';
import { StyledTextField } from './elements';

const FormEndereco = ({
  CEP,
  setCEP,
  endereco,
  setEndereco,
  numero,
  setNumero,
  complemento,
  setComplemento,
  bairro,
  setBairro,
  cidade,
  setCidade,
  estado,
  setEstado,
}) => {
  const gerarEndereco = (value) => {
    if (value.length === 8) {
      cep(value)
        .then((enderecoGerado) => {
          setEndereco(enderecoGerado.street);
          setBairro(enderecoGerado.neighborhood);
          setCidade(enderecoGerado.city);
          setEstado(enderecoGerado.state);
        })
        .catch((e) => {});
    }
  };

  const handleCEP = (values) => {
    const newValue = values.value;

    setCEP(newValue);
    gerarEndereco(newValue);
  };

  return (
    <>
      <Form.Division>
        <NumberFormat
          data-testid="cep-field"
          className="form-item-p"
          label="CEP"
          value={CEP}
          onValueChange={handleCEP}
          format="#####-###"
          customInput={StyledTextField}
        />
        <TextField
          data-testid="endereco"
          className="form-item-g"
          label="Endereço"
          value={endereco}
          onChange={(e) => {
            setEndereco(e.target.value);
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          data-testid="numero"
          className="form-item-p"
          label="Número"
          value={numero}
          onChange={(e) => {
            setNumero(e.target.value);
          }}
        />
        <TextField
          data-testid="complemento"
          className="form-item-m"
          label="Complemento"
          value={complemento}
          onChange={(e) => {
            setComplemento(e.target.value);
          }}
        />
      </Form.Division>
      <Form.Division>
        <TextField
          data-testid="bairro"
          className="form-item-g"
          label="Bairro"
          value={bairro}
          onChange={(e) => {
            setBairro(e.target.value);
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          data-testid="cidade"
          className="form-item-g"
          label="Cidade"
          value={cidade}
          onChange={(e) => {
            setCidade(e.target.value);
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          data-testid="estado"
          className="form-item-p"
          label="Estado"
          value={estado}
          inputProps={{ maxLength: 2 }}
          onChange={(e) => {
            setEstado(e.target.value);
          }}
          InputLabelProps={{ shrink: true }}
        />
      </Form.Division>
    </>
  );
};

export { FormEndereco as default };
