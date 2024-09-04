import { UsersInterface } from "../../interfaces/IUser";
import { SignInInterface } from "../../interfaces/SignIn";
import { WorkInterface } from "../../interfaces/Work";
import { PostworkInterface } from "../../interfaces/Postwork";
import axios from "axios";

const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

async function SignIn(data: SignInInterface) {
  return await axios
    .post(`${apiUrl}/signin`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetUsers() {
  return await axios
    .get(`${apiUrl}/users`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetWork() {
  return await axios
    .get(`${apiUrl}/works`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetPostwork() {
  return await axios
    .get(`${apiUrl}/postworks`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetUsersById(id: string) {
  return await axios
    .get(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetWorkById(id: string) {
  return await axios
    .get(`${apiUrl}/work/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetPostworkById(id: string) {
  return await axios
    .get(`${apiUrl}/postwork/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateUsersById(id: string, data: UsersInterface) {
  return await axios
    .put(`${apiUrl}/user/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateWorkById(id: string, data: WorkInterface) {
  return await axios
    .put(`${apiUrl}/work/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteUsersById(id: string) {
  return await axios
    .delete(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteWorkById(id: string) {
  return await axios
    .delete(`${apiUrl}/work/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateUser(data: UsersInterface) {
  return await axios
    .post(`${apiUrl}/signup`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateWork(data: WorkInterface) {
  return await axios
    .post(`${apiUrl}/works`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
export {
  SignIn,
  GetUsers,
  GetUsersById,
  UpdateUsersById,
  DeleteUsersById,
  CreateUser,
  GetWork,
  GetWorkById,
  UpdateWorkById,
  DeleteWorkById,
  CreateWork,
  GetPostwork,
  GetPostworkById,
};
