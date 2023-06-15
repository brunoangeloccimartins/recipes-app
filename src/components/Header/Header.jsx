import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Button from '../Button';
import '../../styles/Header.css';
import SearchBar from '../SearchBar/SearchBar';

function Header() {
  const [isHidden, setHidden] = useState(true);
  const location = useLocation();
  const history = useHistory();

  let PROFILE_ICON;
  let SEARCH_ICON;

  switch (location.pathname) {
  case '/meals':
  case '/drinks':
    PROFILE_ICON = profileIcon;
    SEARCH_ICON = searchIcon;
    break;
  case '/profile':
  case '/done-recipes':
  case '/favorite-recipes':
  default:
    PROFILE_ICON = profileIcon;
    SEARCH_ICON = null;
    break;
  }

  return (
    <div className="header-container bg-color">
      <div className="btn-title-container">
        <h2>RecipesAPP</h2>
        <div className="btn-container">
          { SEARCH_ICON
            && (
              <Button
                value={ <img
                  src={ SEARCH_ICON }
                  alt="Ícone de pesquisa"
                  data-testid="search-top-btn"
                /> }
                onClick={ () => setHidden(!isHidden) }
                className="search-btn"
              />
            ) }
          <Button
            value={ <img
              src={ PROFILE_ICON }
              alt="Ícone de perfil"
              data-testid="profile-top-btn"
            /> }
            onClick={ () => history.push('/profile') }
            className="profile-btn"
          />
        </div>
      </div>

      <div className="input-container">
        { !isHidden
              && (
                <SearchBar />
              )}
      </div>
    </div>
  );
}

export default Header;
