import http from './config'

const all = () => {
    return http.get('/api/categories')
}

const find = id => {
    return http.get(`/api/categories/${id}`)
}

const create = (data) => {
    return http.post('/api/categories/create', data)
}

const update = (id, data) => {
    return http.put(`/api/categories/update/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/categories/delete/${id}`)
}

export default {
    all,
    find,
    create,
    update,
    remove
}