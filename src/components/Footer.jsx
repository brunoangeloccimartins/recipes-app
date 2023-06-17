import React from 'react';
import { Link } from 'react-router-dom';
import mealImg from '../images/icons/meals-footer2.png';
import drinks from '../images/icons/drinks-footer2.png';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer-fixed bg-color">
      <Link to="/meals">
        <img
          src={ mealImg }
          alt="imagem de um drink"
          data-testid="meals-bottom-btn"
        />
      </Link>
      <Link to="/drinks">
        <img
          src={ drinks }
          alt="imagem de um drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
    </footer>
  );
}
