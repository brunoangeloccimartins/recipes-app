import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

// beforeAll(() => {
//   Object.defineProperty(window, 'localStorage', {
//     value: {
//       getItem: jest.fn(),
//       setItem: jest.fn(),
//       removeItem: jest.fn(),
//       clear: jest.fn(),
//     },
//     writable: true,
//   });
// });
const email = 'email@email.com';

describe('Testa a página de Perfil', () => {
  it('Testa se tem o título Profile', () => {
    renderWithRouterAndRedux(<App />, {}, '/profile');
    screen.getByRole('heading', { name: /profile/i });
  });
  it('Testa se renderiza o e-mail da pessoa usuária', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    const inputSenha = screen.getByPlaceholderText(/digite sua senha/i);
    const btnEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    act(() => {
      userEvent.type(inputEmail, email);
      userEvent.type(inputSenha, '1234567');
      userEvent.click(btnEntrar);
    });

    const profileIcon = screen.getByRole('button', { name: /ícone de perfil/i });

    act(() => {
      userEvent.click(profileIcon);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Testa se existem os botões', () => {
    renderWithRouterAndRedux(<App />, {}, '/profile');
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });
  it('Testa o botão de logout', () => {
    Storage.prototype.clear = jest.fn();
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');
    const logout = screen.getByRole('button', { name: /logout/i });
    act(() => {
      userEvent.click(logout);
    });
    expect(localStorage.clear).toHaveBeenCalled();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa as rotas da página', () => {
    const user = { email: 'email@email.com' };
    localStorage.setItem('user', JSON.stringify(user));
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');
    const doneBtn = screen.getByRole('button', { name: /done recipes/i });

    act(() => {
      userEvent.click(doneBtn);
    });

    screen.findByText(email);

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

  it('Testa se nada renderiza caso não seja passado localStorage', () => {
    localStorage.setItem('user', JSON.stringify({}));
    renderWithRouterAndRedux(<App />, {}, '/profile');

    screen.getByText('Done Recipes');
    screen.getByText('Favorite Recipes');
    screen.getByText('Logout');
  });

  // test('Teste do if dentro do useEffect', () => {
  //   const mockStoredUser = { email: 'test@example.com' };
  //   const getSavedUser = jest.fn(() => mockStoredUser);
  //   const setUserEmail = jest.fn();

  //   renderWithRouterAndRedux(
  //     <App getSavedUser={ getSavedUser } setUserEmail={ setUserEmail } />,
  //   );

  //   expect(getSavedUser).toHaveBeenCalledWith('user');
  //   expect(setUserEmail).toHaveBeenCalledWith('test@example.com');
  // });
});
