import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/';
import Card from 'react-bootstrap/Card';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Button from '../../components/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../styles/Profile.css';
import { getSavedUser, removeUser } from '../../services/localStorageLogin';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const storedUser = getSavedUser('user');
    const { email } = storedUser;
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    history.push('/');
    removeUser('user');
  };

  return (
    <div className="profile">
      <Header />
      <div className="container">
        <Card>
          <Card.Body>
            <Card.Title>
              Profile
            </Card.Title>
            { userEmail
                && (
                  <Card.Text>
                    { `E-mail:  ${userEmail}` }
                  </Card.Text>
                )}
          </Card.Body>
        </Card>

      </div>
      <section>

        <Button
          onClick={ () => history.push('/done-recipes') }
          className="btn-login"
          value="Done Recipes"
        />
        <Button
          onClick={ () => history.push('/favorite-recipes') }
          className="btn-login"
          value="Favorite Recipes"
        />
        <Button
          onClick={ handleLogout }
          className="btn-login"
          value="Logout"
        />
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
