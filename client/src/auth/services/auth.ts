import axios from "axios";
import { IFormAuth, IFormRegister } from "../interfaces/auth";
import { apiUrl } from "../../config/api";

export const authLogin = async (data: IFormAuth) =>
  await axios.post(`${apiUrl}/auth/login`, data);

export const authRegister = async(data: IFormRegister)=>
  await axios.post(`${apiUrl}/auth/register`, data)
