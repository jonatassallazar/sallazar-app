import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const StyledTextField = styled(TextField)`
  
  .MuiFormLabel-root.Mui-focused {
    color: ${({theme}) => theme.colors.primary};
  }

  .MuiInput-underline:after {
    border-bottom: 2px solid ${({theme}) => theme.colors.primary};
}
`;

export default StyledTextField;