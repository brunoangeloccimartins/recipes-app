import { useDispatch, useSelector } from 'react-redux';
import contries from '../services/CountriesData';
import { filterByCountry } from '../redux/actions/actions-searchBar';

function SelectFilter() {
  const dispatch = useDispatch();
  const { selectedCountry } = useSelector((rootReducer) => rootReducer.searchBar);
  return (
    <select
      value={ selectedCountry }
      onChange={ (e) => dispatch(filterByCountry(e.target.value)) }
    >
      <option
        value="Search by country"
        hidden
      >
        Search by country
      </option>
      <option value="All">All</option>
      { contries.map((country, index) => (
        <option
          className="option-country"
          key={ index }
          value={ country }
        >
          {country}
        </option>
      ))}
    </select>
  );
}

export default SelectFilter;
