import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    const { data } = response;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default { getAll };
