import axios from "axios";

export const BASE_URL = "https://amaderthikana.com/api/ducaa";

export const BASE_URL_ROOT = "https://amaderthikana.com/api";

export const BASE_URL_PAYMENT = "https://amaderthikana.com/epay"

export const TITLE = "DHAKA UNIVERSITY CHEMISTRY ALUMNI ASSOCIATION";

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