import axios from "axios";

export const BASE_URL = "https://laravel.amaderthikana.com/api/ducaa";

export const BASE_URL_ROOT = "https://laravel.amaderthikana.com/api";

export const BASE_URL_PAYMENT = "https://laravel.amaderthikana.com/"

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};