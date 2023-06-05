import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Button from '../../components/Button';

function Header() {
  const location = useLocation();

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
    <div>
      <Button
        value={ <img
          src={ PROFILE_ICON }
          alt="Ícone de perfil"
          data-testid="profile-top-btn"
        /> }
      />
      { SEARCH_ICON
        && (
          <Button
            value={ <img
              src={ SEARCH_ICON }
              alt="Ícone de pesquisa"
              data-testid="search-top-btn"
            /> }
          />
        ) }
      <h1 data-testid="page-title">{ headerText }</h1>
    </div>
  );
}

export default Header;
