import ACTIONS_TYPE_SEARCH_BAR from '../actions-type/actions-type-searchBar';

const INITAL_STATE = {
  searchValue: '',
  radioValue: '',
};

const searchBarReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS_TYPE_SEARCH_BAR.SEARCH:
    return {
      ...state,
      searchValue: action.payload.searchValue,
      radioValue: action.payload.radioValue,
    };
  default:
    return state;
  }
};

export default searchBarReducer;
