import axios from 'axios';
import { baseUrl } from "./baseUrl";

const client = axios.create({
  baseURL: `${baseUrl}Admin`,
  });

  export const loginAdmin = async (email, password) => {
    try {
      const response = await client.get(`login/${email}/${password}`);
      return response.data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };
