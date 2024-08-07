// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from '../main';
const lightbox = new SimpleLightbox('.gallery li', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function marcupImage(images) {
  const marcup = images
    .map(image => {
      return `<li class="gallery-item"
      <a class="gallery-link" href="${image.largeImageURL}">
    <img
      width=360;
      height=200;
      class="gallery-image"
      src="${image.webformatURL}"
      alt="${image.tags} " />
          <div class="image-info">
               <p>LIKES: ${image.likes}</p>
                    <p>VIEWS: ${image.views}</p>
                    <p>COMMENTS: ${image.comments}</p>
                    <p>DOWNLOADS: ${image.downloads}</p>
                </div>
            </a>
            </li>
        `;
    })
    .join('');
  refs.imgGallery.innerHTML = marcup;
  lightbox.refresh();
}
export function showLoader() {
  refs.loader.classList.remove('hidden');
}

export function hideLoader() {
  refs.loader.classList.add('hidden');
}
export function formReset() {
  refs.formSearch.reset();
}