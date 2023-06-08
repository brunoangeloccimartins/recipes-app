import React from 'react';
import Input from '../Input';
import Button from '../Button';

export default function SearchBar() {
  return (
    <div>
      <Input
        type="text"
        name="search"
        placeholder="Busque um drink ou comida"
        value=""
        test="search-input"
        className=""
      />
      <div>
        <label htmlFor="ingredient">
          <Input
            type="radio"
            name="ingredient"
            id="ingredient"
            // value={ value }
            test="ingredient-search-radio"
            className=""
            // onClick={ onClick }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <Input
            type="radio"
            name="name"
            id="name"
            // value={ value }
            test="name-search-radio"
            className=""
            // onClick={ onClick }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <Input
            type="radio"
            name="first-letter"
            id="first-letter"
            // value={ value }
            test="first-letter-search-radio"
            className=""
            // onClick={ onClick }
          />
          First letter
        </label>

        <Button
          className=""
          // onClick={ onClick }
          test="exec-search-btn"
          value="Pesquisar"
        />
      </div>
    </div>
  );
}
