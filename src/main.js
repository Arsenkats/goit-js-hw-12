import { getImage } from './js/pixabay-api.js';
import {
  marcupImage,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore,
  checkEndPages,
} from './js/render-function';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let inputValue = '';
let currentPage = 1;
let perPage = 15;
let maxPage = 1;
export const refs = {
  formSearch: document.querySelector('#search'),
  inputImgSearch: document.querySelector('.input-img-search'),
  imgGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

const lightbox = new SimpleLightbox('.gallery li', {
  captionsData: 'alt',
  captionDelay: 250,
});

function skipOldElement(x = 0, y = 0) {
  const liEl = refs.imgGallery.children[0];
  if (liEl) {
    const height = liEl.getBoundingClientRect().height;
    window.scrollBy({
      top: height * 2,
      left: y,
      behavior: 'smooth',
    });
  }
}

refs.formSearch.addEventListener('submit', async e => {
  e.preventDefault();
  console.log('Form submit handler triggered');
  refs.imgGallery.innerHTML = '';
  inputValue = e.target.elements.search.value.trim();
  currentPage = 1;

  
  hideLoadMore();

  if (inputValue === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please, enter the query.',
      backgroundColor: '#ef4040',
      layout: 2,
      position: 'topRight',
      displayMode: 'once',
    });
    refs.formSearch.reset();
    return;
  }

  showLoader();

  try {
    const data = await getImage(inputValue, currentPage, perPage);
    maxPage = Math.ceil(data.totalHits / perPage);
    if (data.totalHits === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        layout: 2,
        displayMode: 'once',
        backgroundColor: '#ef4040',
        progressBarColor: '#B51B1B',
        position: 'topRight',
      });
      hideLoader();
      return;
    }

    marcupImage(data.hits);
    lightbox.refresh();
    hideLoader();
    console.log('Calling showLoadMore()');
    showLoadMore();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `${error}`,
      layout: 2,
      displayMode: 'once',
      backgroundColor: '#ef4040',
      progressBarColor: '#B51B1B',
      position: 'topRight',
    });
  }
});

refs.loadMoreBtn.addEventListener('click', async () => {
  currentPage++; 
  console.log('Current Page:', currentPage); // Перевірте значення
  console.log('Input Value:', inputValue); // Перевірте значення
  hideLoadMore();
  showLoader();

  try {
    const data = await getImage(inputValue, currentPage, perPage);
    marcupImage(data.hits);
    lightbox.refresh();
    hideLoader();
    checkEndPages(currentPage, maxPage);
    skipOldElement();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `${error}`,
      layout: 2,
      displayMode: 'once',
      backgroundColor: '#ef4040',
      progressBarColor: '#B51B1B',
      position: 'topRight',
    });
  }
});
