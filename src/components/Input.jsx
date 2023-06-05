import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Input extends Component {
  render() {
    const {
      type,
      name,
      id,
      placeholder,
      value,
      onChange,
      test,
      checked,
      disabled,
      className,
      onClick,
    } = this.props;
    return (

      <input
        type={ type }
        name={ name }
        id={ id }
        placeholder={ placeholder }
        checked={ checked }
        value={ value }
        onChange={ onChange }
        data-testid={ test }
        disabled={ disabled }
        className={ className }
        onClick={ onClick }
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  test: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  name: '',
  id: '',
  placeholder: '',
  value: '',
  onChange: () => {},
  test: '',
  className: '',
  checked: false,
  disabled: false,
  onClick: () => {},
};

export default Input;
