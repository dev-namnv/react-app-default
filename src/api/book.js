import http from './config'

const all = () => {
    return http.get('/api/books')
}

const getByCategory = cate_id => {
    return http.get(`/api/books/category/${cate_id}`)
}

const find = id => {
    return http.get(`/api/books/${id}`)
}

const create = data => {
    return http.post('/api/books/create', data)
}

const update = (id, data) => {
    return http.put(`/api/books/update/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/books/delete/${id}`)
}

export default {
    all,
    find,
    create,
    update,
    remove,
    getByCategory
}