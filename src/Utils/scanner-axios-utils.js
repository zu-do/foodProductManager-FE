import axios from 'axios';
import { baseUrl } from "./baseUrl";

const client = axios.create({
    baseURL: `${baseUrl}Scanner/barcode`
  });

  export const getProductInfo = async (barcode) => {
    try {
      const response = await client.get(`/${barcode}`);
      return response.data;
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };
  