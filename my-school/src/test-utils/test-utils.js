import React from 'react';
import { render } from '@testing-library/react'
import { ThemeProvider } from "@chakra-ui/core";
import customTheme from '../Styles/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import "mutationobserver-shim";

const AllTheProviders = ({ children }) => {
    return (
      <ThemeProvider customTheme={customTheme}>
        <Router>
          {children}
        </Router>
      </ThemeProvider>
    )
  }

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }