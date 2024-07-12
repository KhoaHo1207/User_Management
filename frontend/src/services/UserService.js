import axios from "./customizeAxios";
const fetchAllUser = (currentPage) => {
  return axios.get(`/users?page=${currentPage}`); //tra ve 1 promise -> await
};

const postCreateUser = (name, job) => {
  return axios.post("/users", { name: name, job: job });
};

const putUpdateUser = (name, job) => {
  return axios.put("/users/2", { name: name, job: job });
};

const deleteUser = (id) => {
  return axios.delete(`/users/${id}`);
};

const loginApi = (email, password) => {
  return axios.post("/login", { email, password });
};
export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi };
