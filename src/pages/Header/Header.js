import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

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
    <div>
      <Button
        value={ <img
          src={ PROFILE_ICON }
          alt="Ícone de perfil"
          data-testid="profile-top-btn"
        /> }
        onClick={ () => history.push('/profile') }
      />
      { SEARCH_ICON
        && (
          <div>
            { !isHidden
              && (
                <Input
                  test="search-input"
                  type="text"
                />
              )}
            <Button
              value={ <img
                src={ SEARCH_ICON }
                alt="Ícone de pesquisa"
                data-testid="search-top-btn"
              /> }
              onClick={ () => setHidden(!isHidden) }
            />
          </div>
        ) }

      <h1 data-testid="page-title">{ headerText }</h1>

    </div>
  );
}

export default Header;
