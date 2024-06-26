import axios from 'axios'

const baseURL = 'https://api.jiony.dev'
// const baseURL = 'http://localhost:4001'

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
