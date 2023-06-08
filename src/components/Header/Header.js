import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Button from '../Button';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';

function Header() {
  const [isHidden, setHidden] = useState(true);
  const location = useLocation();
  const history = useHistory();

  let headerText;
  let PROFILE_ICON;
  let SEARCH_ICON;

  switch (location.pathname) {
  case '/meals':
    headerText = 'Meals';
    PROFILE_ICON = profileIcon;
    SEARCH_ICON = searchIcon;
    break;
  case '/drinks':
    headerText = 'Drinks';
    PROFILE_ICON = profileIcon;
    SEARCH_ICON = searchIcon;
    break;
  case '/profile':
    headerText = 'Profile';
    PROFILE_ICON = profileIcon;
    SEARCH_ICON = null;
    break;
  case '/done-recipes':
    headerText = 'Done Recipes';
    PROFILE_ICON = profileIcon;
    SEARCH_ICON = null;
    break;
  case '/favorite-recipes':
    headerText = 'Favorite Recipes';
    PROFILE_ICON = profileIcon;
    SEARCH_ICON = null;
    break;
  default:
    headerText = 'Default Header';
    break;
  }

  return (
    <div className="header-container">
      <div className="btn-title-container">
        <h2>RecipesAPP</h2>
        <div className="input-container">
          { !isHidden
              && (
                <SearchBar />
              )}
        </div>
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

      <div className="page-title">
        <h1
          data-testid="page-title"
        >
          { headerText }
        </h1>
      </div>
    </div>
  );
}

export default Header;
