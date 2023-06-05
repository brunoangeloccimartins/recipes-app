import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';

import Input from './Input';
import Button from './Button';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const inputValidation = () => {
    const emailValidation = validator.isEmail(email);
    const passwordValidation = validator.isLength(password, { min: 6 });
    if (emailValidation && passwordValidation) {
      setIsDisabled(false);
    }
  };

  const handleChange = ({ target: { value } }, setState) => {
    setState(value);
    inputValidation();
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <form>
      <h1>Login</h1>
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Digite seu Email"
        value={ email }
        onChange={ (e) => handleChange(e, setEmail) }
        test="email-input"
      />

      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Digite sua Senha"
        onChange={ (e) => handleChange(e, setPassword) }
        value={ password }
        test="password-input"
      />

      <Button
        value="Entrar"
        type="button"
        test="login-submit-btn"
        disabled={ isDisabled }
        onClick={ handleSubmit }
      />

    </form>
  );
}

export default Form;
