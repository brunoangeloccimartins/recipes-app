import React from 'react';
import { Link } from 'react-router-dom';
import drinks from '../images/drinkIcon.svg';
import mealImg from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer-fixed bg-color">
      <Link to="/drinks">
        <img
          src={ drinks }
          alt="imagem de um drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          src={ mealImg }
          alt="imagem de um drink"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}
