import { getImage } from './js/pixabay-api.js';
import {
  marcupImage,
  showLoader,
  hideLoader,
  formReset,
} from './js/render-function.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const refs = {
  formSearch: document.querySelector('#search'),
  inputImgSearch: document.querySelector('.input-img-search'),
  imgGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

refs.formSearch.addEventListener('submit', event => {
  event.preventDefault();
  const imgKeyWord = refs.inputImgSearch.value.trim();
  if (imgKeyWord === '') {
    refs.imgGallery.innerHTML = ' ';
    iziToast.warning({
      title: 'warning',
      message: ' Enter a word for the query, please.',
      layout: 2,
      position: 'topRight',
      displayMode: 'once',
    });
    return;
  }
  showLoader();
  refs.imgGallery.innerHTML = ' ';
  getImage(imgKeyWord)
    .then(({ hits }) => {
      if (hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          layout: 2,
          position: 'topRight',
          displayMode: 'once',
        });
        hideLoader();
        formReset();
        return;
      }
      hideLoader();
      marcupImage(hits);
      formReset();
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
          title: 'Error',
          message:
            `${error}`,
          layout: 2,
          position: 'topRight',
          displayMode: 'once',
      });
     
    });
});