import axios from 'axios';

const client = axios.create({
    baseURL: 'https://localhost:7258/Shelf',
  });

  export const getShelves = async () => {
    try {
      const response = await client.get(`/getAll`);
      return response.data;
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };

  export const getUserShelves = async (email) => {
    try {
      const response = await client.get(`/getAll/${email}`);
      return response.data;
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };
  export const addShelf = async (shelfName, userID) => {
    try {
      await client.post(`/create/${shelfName}/${userID}`);
      return true;
    } catch (err) {
      console.log(err.response);
      return err.response.data.errors;
    }
  };