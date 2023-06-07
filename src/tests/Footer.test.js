import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Teste do componente <Footer />', () => {
  it('Testa se o footer está presente na página e se existe 2 links', () => {
    renderWithRouterAndRedux(<App />, {}, '/meals');
    screen.getByRole('contentinfo');
    const images = screen.getAllByRole('link');
    const num = 2;
    expect(images).toHaveLength(num);
  });
  it('Testa se o footer não está presente na página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    act(() => {
      history.push('/done-recipes');
    });
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    act(() => {
      history.push('/favorite-recipes');
    });
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });
});
