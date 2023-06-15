import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const names = 'Spicy Arrabiata Penne';
const doneDates = '23/06/2020';
const pathName = '/done-recipes';

const newDoneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: names,
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: doneDates,
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: doneDates,
    tags: [],
  },
];

describe('Testa a página de receitas feitas', () => {
  afterEach(() => localStorage.clear());

  it('Vamos testar se existem os componentes da página de receitas feitas', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    renderWithRouterAndRedux(<App />, {}, pathName);

    screen.getByText('Done Recipes');
    screen.getByText(names);
    screen.getByText('Aquamarine');
    const bntAll = screen.getByRole('button', {
      name: /all/i,
    });
    const btnMeals = screen.getByRole('button', {
      name: /meals/i,
    });
    const btnDrinks = screen.getByRole('button', {
      name: /drinks/i,
    });

    act(() => {
      userEvent.click(btnMeals);
    });

    screen.getByText(names);
    expect(screen.queryByText('Aquamarine')).not.toBeInTheDocument();

    act(() => {
      userEvent.click(btnDrinks);
    });

    screen.getByText('Aquamarine');
    expect(screen.queryByText(names)).not.toBeInTheDocument();

    act(() => {
      userEvent.click(bntAll);
    });

    expect(screen.getAllByText(doneDates)).toHaveLength(2);
  });

  it('Testando se o usuário é redirecionado para páginas de detalhe quando clicado no card', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />, {}, pathName);

    const btnRecipeMeals = screen.getByTestId('0-horizontal-image');

    act(() => {
      userEvent.click(btnRecipeMeals);
    });

    expect(history.location.pathname).toBe('/meals/52771');
  });

  it('Testando se o usuário é redirecionado para páginas de detalhe quando clicado no card', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />, {}, pathName);

    const btnRecipeDrinks = screen.getByTestId('1-horizontal-image');
    console.log(btnRecipeDrinks);

    act(() => {
      userEvent.click(btnRecipeDrinks);
    });

    expect(history.location.pathname).toBe('/drinks/178319');
  });
});
