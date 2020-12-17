import axios from 'axios'

export default async function apiUser(path) {
    return axios.get(path)
}