import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Button from '../Button';
import '../../styles/Header.css';
import SearchBar from '../SearchBar/SearchBar';
import { saveHidden } from '../../redux/actions/actions-searchBar';

function Header() {
  const [isHidden, setHidden] = useState(false);
  const dispatch = useDispatch();
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
    <>
      <div className="container-title-btns bg-color">
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
                onClick={ () => {
                  setHidden(!isHidden);
                  dispatch(saveHidden(!isHidden));
                } }
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

      { isHidden && (
        <SearchBar />
      )}

    </>

  );
}

export default Header;
