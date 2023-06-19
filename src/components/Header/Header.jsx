import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Button from '../Button';
import '../../styles/Header.css';
import SearchBar from '../SearchBar/SearchBar';
import logo from '../../images/CookIt.png';
import { saveHidden } from '../../redux/actions/actions-searchBar';

function Header() {
  const [isHidden, setHidden] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  let PROFILE_ICON;
  let SEARCH_ICON;

  switch (pathname) {
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

  const renderRoute = () => {
    if (pathname.includes('favorite')
      || pathname.includes('done')
      || pathname.includes('profile')
    ) {
      return history.push('./meals');
    }
  };

  return (
    <>
      <div className="container-title-btns bg-color">
        <div className="title-container">
          <Button
            value={ <img src={ logo } alt="Foto da logo" /> }
            onClick={ renderRoute }
          />
        </div>
        <div className="btn-container">
          <Button
            className={ SEARCH_ICON ? 'visible-yes search-btn' : 'visible-no' }
            value={ <img
              src={ SEARCH_ICON }
              alt="Ícone de pesquisa"
              data-testid="search-top-btn"
            /> }
            onClick={ () => {
              setHidden(!isHidden);
              dispatch(saveHidden(!isHidden));
            } }
          />
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
