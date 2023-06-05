import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import App from '../App';

describe('Testa o componente Login', () => {
  it('Testa se a rota muda para a tela principal de receitas '
  + 'ao clicar no botão de login', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    const validEmail = 'test@test.com';
    const validPassword = '1234567';

    const invalidEmail = 'test@test';
    const invalidPassword = '12345';

    userEvent.type(emailInput, invalidEmail);
    userEvent.type(passwordInput, invalidPassword);

    expect(loginButton).toBeDisabled();

    act(() => {
      userEvent.clear(emailInput);
      userEvent.clear(passwordInput);
    });

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    expect(loginButton).toBeEnabled();

    act(() => {
      userEvent.click(loginButton);
    });

    expect(history.location.pathname).toBe('/meals');
  });
});
