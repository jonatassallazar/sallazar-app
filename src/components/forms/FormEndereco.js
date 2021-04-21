import React from 'react';
import TextField from '@material-ui/core/TextField';
import cep from 'cep-promise';
import InputMask from 'react-input-mask';
import Form from './Form';

//let CEPerror = false;

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
  //const [CEPErrorText, setCEPErrorText] = useState(undefined);

  const gerarEndereco = (event) => {
    if (event.length === 8) {
      cep(event)
        .then((valor) => {
          setEndereco(valor.street);
          setBairro(valor.neighborhood);
          setCidade(valor.city);
          setEstado(valor.state);
        })
        .catch((e) => {
        });
    }
  };

  const handleCEP = (e) => {
    const newValue = e.target.value;
    const rawValue = newValue.replace(/(-)/, "");
    
    setCEP(newValue);
    gerarEndereco(rawValue);
  }

  return (
    <>
    <Form.Division>
      <InputMask
        label="CEP"
        value={CEP}
        onChange={handleCEP}
        mask="99999-999"
        maskChar=""
      >
        {(inputProps) => <TextField {...inputProps} />}
      </InputMask>
      <TextField
        className="form-item-g"
        id="standard-basic endereco"
        label="Endereço"
        value={endereco}
        onChange={(e) => {
          setEndereco(e.target.value);
        }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        className="form-item-p"
        id="standard-basic numero"
        label="Número"
        value={numero}
        onChange={(e) => {
          setNumero(e.target.value);
        }}
      />
      <TextField
        className="form-item-m"
        id="standard-basic complemento"
        label="Complemento"
        value={complemento}
        onChange={(e) => {
          setComplemento(e.target.value);
        }}
        />
        </Form.Division>
        <Form.Division>
      <TextField
        className="form-item-g"
        id="standard-basic bairro"
        label="Bairro"
        value={bairro}
        onChange={(e) => {
          setBairro(e.target.value);
        }}
        InputLabelProps={{ shrink: true }}
        />
      <TextField
        className="form-item-g"
        id="standard-basic cidade"
        label="Cidade"
        value={cidade}
        onChange={(e) => {
          setCidade(e.target.value);
        }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        className="form-item-p"
        id="standard-basic estado"
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
