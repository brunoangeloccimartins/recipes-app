import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../Input';
import Button from '../Button';
import { saveSearch } from '../../redux/actions/actions-searchBar';
import '../../styles/Recipes.css';

export default function SearchBar() {
  const [checked, setChecked] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const dispacth = useDispatch();

  const handleChange = ({ target: { value } }, setState) => {
    setState(value);
  };

  const handleClick = () => {
    const maxLetter = 1;
    if (checked === 'first-letter' && inputSearch.length !== maxLetter) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (checked === '') {
      global.alert('Are you cego, man? Selecione um radio input!');
    }
    const savedValues = {
      searchValue: inputSearch,
      radioValue: checked,
    };
    dispacth(saveSearch(savedValues));
  };

  return (
    <div className="search-bar">
      <Input
        type="text"
        name="search"
        placeholder="Busque um drink ou comida"
        value={ inputSearch }
        test="search-input"
        className="input-txt"
        onChange={ (e) => handleChange(e, setInputSearch) }
      />
      <div className="search-bar-radios">
        <label htmlFor="ingredient">
          <Input
            type="radio"
            name="category"
            id="ingredient"
            value="ingredient"
            test="ingredient-search-radio"
            className=""
            checked={ checked === 'ingredient' }
            onChange={ (e) => handleChange(e, setChecked) }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <Input
            type="radio"
            name="category"
            id="name"
            value="name"
            test="name-search-radio"
            className=""
            checked={ checked === 'name' }
            onChange={ (e) => handleChange(e, setChecked) }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <Input
            type="radio"
            name="category"
            id="first-letter"
            value="first-letter"
            test="first-letter-search-radio"
            className=""
            checked={ checked === 'first-letter' }
            onChange={ (e) => handleChange(e, setChecked) }
          />
          First letter
        </label>

      </div>
      <Button
        test="exec-search-btn"
        value="Pesquisar"
        onClick={ handleClick }
        className="btn-login"
      />
    </div>
  );
}
