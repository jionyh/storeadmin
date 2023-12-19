import axios from 'axios'

const baseURL = 'https://api.jiony.dev'

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
