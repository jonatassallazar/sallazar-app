import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

Form.List = styled.div`
  border-radius: 8px;
  border-top: #3f51b5 solid 4px;
  border-bottom: #3f51b5 solid 4px;

  p {
    text-align: center;
  }
`;

//
Form.Division = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  > div {
    flex: 1;
    margin: 1rem 0.8rem;
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

Form.Item = styled(Form.Division)``;

Form.Error = styled.span`
  width: 100%;
  text-align: center;
  color: #e02828;
  font-variant-caps: all-petite-caps;
  font-size: 1.2rem;
`;

export default Form;
