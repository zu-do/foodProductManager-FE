import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}UnitType`,
});

export const getUnitTypes = async () => {
  try {
    const response = await client.get(`/getAll`);
    return response.data;
  } catch (err) {
    console.error(err.message);
    return [];
  }
};
