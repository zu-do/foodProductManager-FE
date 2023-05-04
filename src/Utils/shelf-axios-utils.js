import axios from 'axios';

const client = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Shelf`
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
  export const editShelf = async (body) => {
    try {
      await client.put(`/update`, body);
      return true;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data.errors;
    }
  };
  