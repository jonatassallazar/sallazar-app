import styled from 'styled-components';

const Tipografia = styled.h1`
  font-family: Roboto, 'Open Sans', sans-serif;
`;

Tipografia.H1 = styled(Tipografia)`
  font-size: ${({ theme }) => theme.font.huge};
  font-weight: 100;
  margin: calc(${({ theme }) => theme.spacing.huge} * 0.75) 0;
`;

Tipografia.H2 = styled(Tipografia)`
  font-size: calc(${({ theme }) => theme.font.huge} * 0.85);
  font-weight: 400;
  margin: calc(${({ theme }) => theme.spacing.huge} * 0.65) 0;
`;

Tipografia.H3 = styled(Tipografia)`
  font-size: calc(${({ theme }) => theme.font.huge} * 0.75);
  font-weight: 500;
  margin: calc(${({ theme }) => theme.spacing.huge} * 0.55) 0;
`;

Tipografia.H4 = styled(Tipografia)`
  font-size: calc(${({ theme }) => theme.font.huge} * 0.65);
  font-weight: 600;
  margin: calc(${({ theme }) => theme.spacing.huge} * 0.45) 0;
`;

Tipografia.H5 = styled(Tipografia)`
  font-size: calc(${({ theme }) => theme.font.huge} * 0.55);
  font-weight: 700;
  margin: calc(${({ theme }) => theme.spacing.huge} * 0.35) 0;
`;

Tipografia.H6 = styled(Tipografia)`
  font-size: calc(${({ theme }) => theme.font.huge} * 0.45);
  font-weight: 800;
  margin: calc(${({ theme }) => theme.spacing.huge} * 0.25) 0;
`;

Tipografia.P = styled(Tipografia)`
  font-size: calc(${({ theme }) => theme.font.huge} * 0.4);
  font-weight: 100;
  line-height: 1.2;
  margin: calc(${({ theme }) => theme.spacing.huge} * 0.2) 0;
`;

Tipografia.SPAN = styled(Tipografia)`
  font-size: calc(${({ theme }) => theme.font.huge} * 0.3);
  font-style: italic;
  font-weight: bold;
  line-height: 1;
  margin: calc(${({ theme }) => theme.spacing.huge} * 0.2) 0;
`;

Tipografia.PRE = styled(Tipografia)`
  background: #f7f7f7;
  font-size: calc(${({ theme }) => theme.font.huge} * 0.4);
  font-weight: 100;
  line-height: 1.5;
  margin: calc(${({ theme }) => theme.spacing.huge} * 0.2) 0;
  padding: ${({ theme }) => theme.spacing.medium};
  white-space: pre-wrap;
  word-break: keep-all;
`;

export default Tipografia;
