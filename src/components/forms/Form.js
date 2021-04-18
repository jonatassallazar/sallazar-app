import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  > div {
    margin: 1rem 0.8rem;
    flex-grow: 1;
  }

  .form-item-p {
    flex: 1;
  }

  .form-item-m {
    flex: 2;
  }

  .form-item-g {
    flex: 3;
  }

  .form-item-gg {
    flex: 4;
  }
`;

Form.List = styled.div`
  border-radius: 8px;
  border-top: #3f51b5 solid 4px;
  border-bottom: #3f51b5 solid 4px;

  p {
    text-align: center;
  }
`;

Form.Item = styled(Form)``;

export default Form;
