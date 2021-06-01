// test-utils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers';
import theme from '../../theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../GlobalStyle';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// pick a date util library
import MomentUtils from '@date-io/moment';

const render = (
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider store={store}>{children}</Provider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
