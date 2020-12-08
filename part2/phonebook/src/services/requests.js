import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(res => res.data)
}

const create = (obj) => {
    const request = axios.post(baseURL, obj)
    return request.then(res => res.data)
}

const update = (id, newObj) => {
    const request = axios.put(`${baseURL}/${id}`, newObj)
    return request.then(request => request.data)
}

const del = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const requestService = { getAll, create, update, del }

export default requestService