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

const getBooks = id => {
    return http.get(`/api/categories/${id}/books`);
}

const addBookId = (category_id, data) => {
    return http.patch(`/api/categories/${category_id}/book/add`, data)
}

const removeBookId = (category_id, data) => {
    return http.patch(`/api/categories/${category_id}/book/remove`, data)
}

export default {
    all,
    find,
    create,
    update,
    remove,
    getBooks,
    addBookId,
    removeBookId
}