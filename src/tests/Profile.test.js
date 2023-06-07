import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
});

describe('Testa a página de Perfil', () => {
  it('Testa se tem o título Profile', () => {
    renderWithRouterAndRedux(<App />, {}, '/profile');
    screen.getByRole('heading', { name: /profile/i });
  });
  // it('Testa se renderiza o e-mail da pessoa usuária', async () => {
  //   const { history } = renderWithRouterAndRedux(<App />);
  //   const email = 'trybe@trybe.com';
  //   const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
  //   const inputSenha = screen.getByPlaceholderText(/digite sua senha/i);
  //   const btnEntrar = screen.getByRole('button', {
  //     name: /entrar/i,
  //   });
  //   act(() => {
  //     userEvent.type(inputEmail, email);
  //     userEvent.type(inputSenha, '1234567');
  //     userEvent.click(btnEntrar);
  //   });

  //   const userEmail = {
  //     email,
  //   };

  //   expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(userEmail));
  //   const profileIcon = screen.getByRole('button', { name: /ícone de perfil/i });

  //   act(() => {
  //     userEvent.click(profileIcon);
  //   });

  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/profile');

  //   localStorage.getItem.mockReturnValueOnce(email);

  //   expect(localStorage.getItem).toHaveBeenCalledWith('user');
  //   expect(localStorage.getItem('user')).toBe(email);
  // });
  it('Testa se existem os botões', () => {
    renderWithRouterAndRedux(<App />, {}, '/profile');
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });
  it('Testa o botão de logout', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');
    const logout = screen.getByRole('button', { name: /logout/i });
    act(() => {
      userEvent.click(logout);
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
  });
  it('Testa as rotas da página', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');
    const doneBtn = screen.getByRole('button', { name: /done recipes/i });

    act(() => {
      userEvent.click(doneBtn);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Testa a rota de favoritos', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');
    const favoriteBtn = screen.getByRole('button', { name: /favorite recipes/i });

    act(() => {
      userEvent.click(favoriteBtn);
    });

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
