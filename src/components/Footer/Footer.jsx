import React from 'react';
import { Link } from 'react-router-dom';
import mealImg from '../../images/icons/meals-footer2.png';
import drinks from '../../images/icons/drinks-footer2.png';
import '../../styles/Footer.css';
import Button from '../Button';
import { useRandomRecipe } from '../../services/hooks/useLaricaButton';
import interrogação from '../../images/randon-button.png';

export default function Footer() {
  const getRandomRecipe = useRandomRecipe();

  return (
    <footer className="footer-fixed bg-color">
      <Link to="/meals">
        <img
          src={ mealImg }
          alt="meal"
          data-testid="meals-bottom-btn"
        />
      </Link>
      <div className="btn-randon">
        <Button
          value={
            <img src={ interrogação } alt="meal" data-testid="explore-bottom-btn" />
          }
          onClick={ getRandomRecipe }
        />
      </div>
      <Link to="/drinks">
        <img
          src={ drinks }
          alt="drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
    </footer>
  );
}
