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
        test=""
        className=""
      />
      <div>
        <Input
          type="ratio"
          name="ingredient"
          // value={ value }
          test="ingredient-search-radio"
          className=""
          // onClick={ onClick }
        />
        <Input
          type="ratio"
          name="name"
          // value={ value }
          test="name-search-radio"
          className=""
          // onClick={ onClick }
        />
        <Input
          type="ratio"
          name=""
          // value={ value }
          test="first-letter-search-radio"
          className=""
          // onClick={ onClick }
        />
        <Button
          className=""
          // onClick={ onClick }
          test="exec-search-btn"
        />
      </div>
    </div>
  );
}
