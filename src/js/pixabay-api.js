'use strict'
import axios from "axios";

export async function getImage(image, page, per_page) {
  try {
    const BASE_URL = 'https://pixabay.com';
    const ENDPOINT = '/api/';

    axios.defaults.baseURL = BASE_URL;

    const params = {
      key: '45227925-dc4eec2d8e9c6a7da21dc7ebe',
      q: image,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: per_page,
    };

    const res = await axios.get(ENDPOINT, { params });
    console.log(res.data);
    return res.data;
  } catch (error) {
    iziToast.error({
          title: 'Error',
          message:
            `${error}`,
          layout: 2,
          position: 'topRight',
          displayMode: 'once',
    });
    throw error;
    
  }
}
