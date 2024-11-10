import axios from "axios";
import { apiUrl } from "../config/api";

export const getUser = async(id: number)=> await axios.get(`${apiUrl}/users/${id}`)