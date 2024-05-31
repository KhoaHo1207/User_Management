import axios from "./customizeAxios";
const fetchAllUser = () => {
  return axios.get("/users?page=2"); //tra ve 1 promise -> await
};

export { fetchAllUser };
