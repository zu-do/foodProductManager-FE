import axios from "axios";
import { baseUrl } from "./baseUrl";

const client = axios.create({
  baseURL: `${baseUrl()}Recipes/v2`
});

export const getRecipes = async (email) => {
  try {
    const response = await client.get(`/${email}`);
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};