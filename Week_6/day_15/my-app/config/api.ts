import axios from 'axios';
import * as SecureStore from "expo-secure-store";

const API_URL = 'http://192.168.1.13:3000/api'

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})
