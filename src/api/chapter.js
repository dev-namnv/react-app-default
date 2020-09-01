import http from './config'

const find = id => {
    return http.get(`/api/chapter/${id}`)
}

const create = data => {
    return http.post('/api/chapter/create', data)
}

const update = (id, data) => {
    return http.put(`/api/chapter/update/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/chapter/delete/${id}`)
}

export default {
    find,
    create,
    update,
    remove,
}