import React from 'react';
import { Link } from 'react-router-dom';
import drinks from '../../images/drinkIcon.svg';
import mealImg from '../../images/mealIcon.svg';
import './Footer.css';
import Button from '../Button';
import { useRandomRecipe } from '../../services/hooks/useLaricaButton';

export default function Footer() {
  const getRandomRecipe = useRandomRecipe();

  return (
    <footer data-testid="footer" className="footer-fixed">
      <Link to="/drinks">
        <img
          src={ drinks }
          alt="drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Button
        value="Larica"
        onClick={ getRandomRecipe }
      />
      <Link to="/meals">
        <img
          src={ mealImg }
          alt="meal"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}
