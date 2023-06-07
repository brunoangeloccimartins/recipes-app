import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import App from '../App';

describe('Testa o componente Header', () => {
  it('Se o título do header muda de acordo com a rota', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/meals');

    const mealsTitle = screen.getByRole('heading', { name: /meals/i, level: 1 });
    const profileBtn = screen.getByRole('button', { name: /ícone de perfil/i });
    const searchBtn = screen.getByRole('button', { name: /ícone de pesquisa/i });

    expect(mealsTitle).toBeInTheDocument();
    expect(profileBtn).toBeDefined();
    expect(searchBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(profileBtn);
    });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/profile');
    expect(profileBtn).toBeDefined();
    expect(searchBtn).not.toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });
  it('Se o input aparece ao clicar no butão de pesquisa'
  + 'Se ele some ao clicar novamente', () => {
    renderWithRouterAndRedux(<App />, {}, '/drinks');

    const searchBtn = screen.getByRole('button', { name: /ícone de pesquisa/i });

    act(() => {
      userEvent.click(searchBtn);
    });

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeDefined();

    act(() => {
      userEvent.click(searchBtn);
    });
    expect(searchInput).not.toBeInTheDocument();
  });
  it('Se o header aparece corretamente na página de receitas feitas', () => {
    renderWithRouterAndRedux(<App />, {}, '/done-recipes');

    const profileBtn = screen.getByRole('button', { name: /ícone de perfil/i });
    expect(profileBtn).toBeInTheDocument();
    expect(screen.getByText(/done recipes/i)).toBeInTheDocument();
  });
  it('Se o header aparece corretamente na página de receitas favoritas', () => {
    renderWithRouterAndRedux(<App />, {}, '/favorite-recipes');

    expect(screen.getByRole('button', { name: /ícone de perfil/i })).toBeInTheDocument();
    expect(screen.getByText(/favorite recipes/i)).toBeInTheDocument();
  });
});
