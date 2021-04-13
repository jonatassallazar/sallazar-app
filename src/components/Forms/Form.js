import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  > div {
    margin: 1.2rem 0.8rem !important;
    flex-grow: 1;
  }

  .form-item-p {
    flex-grow: 1;
  }

  .form-item-m {
    flex-grow: 3;
  }

  .form-item-g {
    flex-grow: 5;
  }

  .form-item-gg {
    flex-grow: 10;
  }
`;

export default Form;
