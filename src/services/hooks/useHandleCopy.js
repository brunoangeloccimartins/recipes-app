import { useDispatch } from 'react-redux';
import clipboardCopy from 'clipboard-copy';
import { copyRecipeLink } from '../../redux/actions/actions-recipeDetails';

const useHandleCopy = () => {
  const dispatch = useDispatch();

  const handleCopy = (type, ids) => {
    let textToCopy;
    const countTimeOut = 3000;

    if (type === 'meal') {
      textToCopy = `http://localhost:3000/meals/${ids}`;
    }
    if (type === 'drink') { textToCopy = `http://localhost:3000/drinks/${ids}`; }

    clipboardCopy(textToCopy)
      .then(() => {
        dispatch(copyRecipeLink(true));
        setTimeout(() => {
          dispatch(copyRecipeLink(false));
        }, countTimeOut);
        console.log('Link copied!');
      })
      .catch((error) => {
        console.error('Erro ao copiar o texto:', error);
      });
  };

  return handleCopy;
};

export default useHandleCopy;
