import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const StyledButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.primary};
    margin: 0 ${({ theme }) => theme.spacing.medium};
  }

  &&:hover {
    background-color: ${({ theme }) => theme.colors.pDark};
  }
`;

StyledButton.Secundary = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.secundary};
    margin: 0 ${({ theme }) => theme.spacing.medium};
  }

  &&:hover {
    background-color: ${({ theme }) => theme.colors.sDark};
  }
`;

StyledButton.Outlined = styled(Button)`
&& {
  background-color: ${({ theme }) => theme.colors.bgColor};
  border: ${({ theme }) => theme.colors.primary} solid 1px;
  margin: 0 ${({ theme }) => theme.spacing.medium};
}

&&:hover {
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.pText};
}
`;

StyledButton.OnlyIcon = styled(Button)`
  && {
  margin: 0;
  min-width: 30px;
  padding: 0 ${({ theme }) => theme.spacing.small} 0 0;
  background: none;
  }

  &&:hover {
  background: none;
  }
  
`;

StyledButton.Link = styled(Link)`
  color: inherit;
`;

export default StyledButton;
