import { useDispatch } from 'react-redux';
import clipboardCopy from 'clipboard-copy';
import Swal from 'sweetalert2';
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
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Link copied!',
        });
        setTimeout(() => {
          dispatch(copyRecipeLink(false));
        }, countTimeOut);
      })
      .catch((error) => {
        console.error('Erro ao copiar o texto:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error copying link',
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return handleCopy;
};

export default useHandleCopy;
