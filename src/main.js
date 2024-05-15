import { fetchImages } from './js/pixabay-api';
import {
  clearGallery,
  renderImages,
  showLoadingIndicator,
  hideLoadingIndicator,
  showErrorToast,
  initLightbox,
} from './js/render-functions';

let currentPage = 1;
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const searchInput = document.getElementById('gallery');
  const loadMoreBtn = document.querySelector('.load-more-btn');

  form.addEventListener('submit', async event => {
    event.preventDefault();
    searchQuery = searchInput.value.trim();
    if (!searchQuery) {
      showErrorToast('Please enter a search query.');
      return;
    }

    clearGallery();
    currentPage = 1;
    await fetchAndRenderImages();

    const data = await fetchImages(searchQuery, currentPage);
    if (data.totalHits > 15) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  });

  loadMoreBtn.addEventListener('click', async () => {
    currentPage++;
    await fetchAndRenderImages();
    smoothScroll();
  });
});

async function fetchAndRenderImages() {
  try {
    showLoadingIndicator();
    const data = await fetchImages(searchQuery, currentPage);
    hideLoadingIndicator();

    if (data.hits.length === 0) {
      showErrorToast(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    renderImages(data.hits);

    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (data.totalHits <= currentPage * 15) {
      loadMoreBtn.style.display = 'none';
      showErrorToast(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      loadMoreBtn.style.display = 'block';
    }

    initLightbox();
  } catch (error) {
    showErrorToast('Failed to fetch images. Please try again later.');
  }
}

function smoothScroll() {
  window.scrollBy({
    top: window.innerHeight * 2,
    behavior: 'smooth',
  });
}
