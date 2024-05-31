import axios from "./customizeAxios";
const fetchAllUser = (currentPage) => {
  return axios.get(`/users?page=${currentPage}`); //tra ve 1 promise -> await
};

const postCreateUser = (name, job) => {
  return axios.post("/users", { name: name, job: job });
};
export { fetchAllUser, postCreateUser };
