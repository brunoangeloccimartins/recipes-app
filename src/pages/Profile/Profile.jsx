import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/';

import Footer from '../../components/Footer';
import Header from '../../components/Header/Header';
import Button from '../../components/Button';

import './Profile.css';
import { clearLocalStorageItem } from '../../services/localStorageUtil';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
      const treatedUser = JSON.parse(storedUser);
      const { email } = treatedUser;
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    history.push('/');
    clearLocalStorageItem('user');
  };

  return (
    <div className="profile">
      <Header />
      <section>
        { userEmail
        && (
          <p data-testid="profile-email">
            { userEmail }
          </p>)}

        <Button
          onClick={ () => history.push('/done-recipes') }
          test="profile-done-btn"
          value="Done Recipes"
        />
        <Button
          onClick={ () => history.push('/favorite-recipes') }
          test="profile-favorite-btn"
          value="Favorite Recipes"
        />
        <Button
          onClick={ handleLogout }
          test="profile-logout-btn"
          value="Logout"
        />
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
