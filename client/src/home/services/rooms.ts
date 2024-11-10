import axios from "axios";
import { apiUrl } from "../../config/api";

export const getRooms =async(token: string)=>await axios.get(`${apiUrl}/rooms`, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
})

export const getRoom =async(id: number, token: string)=>await axios.get(`${apiUrl}/rooms/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
})