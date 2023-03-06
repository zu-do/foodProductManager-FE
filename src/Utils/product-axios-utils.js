import axios from 'axios';

const client = axios.create({
    baseURL: 'https://localhost:7258/Product',
  });

  export const getProducts = async () => {
    try {
      const response = await client.get(`/getAll`);
      return response.data;
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };
  
  export const getProduct = async (index) => {
    try {
      const response = await client.get(`/${index}`);
      return response.data;
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };
  
  export const editProduct = async (body, index) => {
    try {
      await client.put(`/update?id=${index}`, body);
      return true;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data.errors;
    }
  };
  
  export const addProduct = async (body, categoryName) => {
    try {
      await client.post(`/create`, {...body, categoryName: categoryName});
      return true;
    } catch (err) {
      console.log(err.response);
      return err.response.data.errors;
    }
  };