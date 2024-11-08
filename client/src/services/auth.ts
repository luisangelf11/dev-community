import axios from "axios";
import { IFormAuth } from "../interfaces/auth";

export const authLogin = async (data: IFormAuth) =>
  await axios.post(`http://localhost:3000/auth/login`, data);
