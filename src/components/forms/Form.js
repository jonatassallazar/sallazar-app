import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

Form.List = styled.div`
  border-radius: 8px;
  border-top: ${({ theme }) => theme.colors.pLight} solid 4px;
  border-bottom: ${({ theme }) => theme.colors.pLight} solid 4px;

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
  align-items: center;

  > div {
    flex: 1;
    margin: 1rem 0.8rem;
    justify-content: flex-end;
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

Form.Actions = styled.div`
  width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin: ${({ theme }) => theme.spacing.large} 0;
`;

Form.Error = styled.span`
  width: 100%;
  text-align: center;
  color: #e02828;
  font-variant-caps: all-petite-caps;
  font-size: 1.2rem;
`;

Form.Filtro = styled.div`
  border: ${({ theme }) => theme.colors.primary} solid 2px;
  width: 100%;
  border-radius: ${({ theme }) => theme.boxes.borderRadius};
  margin: 2rem auto;
`;

Form.Filtro.Title = styled.p`
  margin: 0 0 -23px 0;
  position: relative;
  top: -13px;
  left: 50px;
  background-color: white;
  width: 70px;
  text-align: center;
  font-size: 1.2rem;
`;

export default Form;
