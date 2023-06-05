import React from 'react';
import Input from './Input';
import Button from './Button';

function Form() {
  return (
    <form>
      <h1>Login</h1>
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Digite seu Email"
        value=""
        test="email-input"
      />

      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Digite sua Senha"
        value=""
        test="password-input"
      />

      <Button
        value="Entrar"
        type="button"
        test="login-submit-btn"
      />

    </form>
  );
}

export default Form;
