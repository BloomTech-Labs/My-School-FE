import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from "@chakra-ui/core";
import customTheme from '../Styles/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Redux/Reducers/rootReducer';
import "mutationobserver-shim";

const AllTheProviders = ({ children }) => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
    return (
      <ThemeProvider customTheme={customTheme}>
        <Provider store={store}>
          <Router>
            {children}
          </Router>
        </Provider>
      </ThemeProvider>
    )
  }

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }