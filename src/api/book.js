import http from './config'

const all = () => {
    return http.get('/api/books')
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

const getChapters = id => {
    return http.get(`/api/books/${id}/chapters`)
}

const addChapter = (book_id, data) => {
    return http.patch(`/api/books/${book_id}/chapter/add`, data)
}

const removeChapterId = (book_id, data) => {
    return http.patch(`/api/books/${book_id}/chapter/remove`, data)
}

export default {
    all,
    find,
    create,
    update,
    remove,
    getChapters,
    addChapter,
    removeChapterId
}