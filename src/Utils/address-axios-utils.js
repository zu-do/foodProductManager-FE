import axios from "axios";
import { baseUrl } from "./baseUrl";

const client = axios.create({
  baseURL: `${baseUrl}Address`,
});

export const addAddress = async (body) => {
  try {
    const response = await client.post(`create`, {...body});
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const getAddress = async (userId) => {
  try {
    const response = await client.get(`getAll/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const deleteAddress = async (id) => {
  try {
    const response = await client.delete(`delete/${id}`);
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const updateAddress = async (body, id) => {
  try {
    const response = await client.put(`update?id=${id}`, body);
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};