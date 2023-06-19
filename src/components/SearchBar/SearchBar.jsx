/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import Input from '../Input';
import Button from '../Button';
import { saveSearch } from '../../redux/actions/actions-searchBar';

import '../../styles/Recipes.css';

export default function SearchBar() {
  const [checked, setChecked] = useState('ingredient');
  const [inputSearch, setInputSearch] = useState('');
  const { pathname } = useLocation();
  const dispacth = useDispatch();

  const handleChange = ({ target: { value } }, setState) => {
    setState(value);
  };

  const handleClick = () => {
    const maxLetter = 1;
    if (checked === 'first-letter' && inputSearch.length !== maxLetter) {
      Swal.fire({
        title: 'Hey',
        text: 'Your search must have only 1 (one) character',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    }
    if (checked === '') {
      Swal.fire({
        title: 'Hey',
        text: 'You need to select an option!',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    }
    const savedValues = {
      searchValue: inputSearch,
      radioValue: checked,
    };
    dispacth(saveSearch(savedValues));
  };

  return (
    <section className="search-bar">
      <Input
        type="text"
        name="search"
        placeholder={ pathname === '/meals' ? 'Search by meal'
          : 'Search by Drink' }
        value={ inputSearch }
        test="search-input"
        className="input-txt input-txt-search"
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
        value="Search"
        onClick={ handleClick }
        className="btn-login btn-search"
      />
    </section>
  );
}
