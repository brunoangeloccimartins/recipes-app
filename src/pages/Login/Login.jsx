import React from 'react';
// import { useDispatch } from 'react-redux';
import Form from '../../components/Form';
import '../../styles/Login.css';

// import { fetchRecipe } from '../../services/fetchRequisition';
// import { saveRecipesMeals, saveRecipesDrinks } from '../../redux/actions/action-recipes';

function Login() {
  // const dispatch = useDispatch();

  // const fetchSave = () => {
  //   const URLdrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  //   fetchRecipe(URLdrinks).then((result) => {
  //     dispatch(saveRecipesDrinks(result.drinks));
  //   }).catch((err) => {
  //     console.log(err);
  //   });

  //   const URLmeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  //   fetchRecipe(URLmeals).then((result) => {
  //     dispatch(saveRecipesMeals(result.meals));
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // };

  // useEffect(() => {
  //   fetchSave();
  // }, []);

  return (
    <div className="login">
      <Form />
    </div>
  );
}

export default Login;
