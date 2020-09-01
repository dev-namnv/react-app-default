import React, {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom'
import CategoryApi from '../../../../api/category'
import $ from 'jquery'

const ListBooks = () => {
    const {id} = useParams()
    const [books, setBooks] = useState([])

    useEffect(() => {
        $("html, body").stop().animate({scrollTop: 0}, 300, 'swing');
        const getListBook = () => {
            return CategoryApi.getBooks(id)
        }
        getListBook().then(({data}) => setBooks(data))
    }, [id])

    return (
        <div>
            <h2>List book</h2>
            <div className="container">
                <ul>
                    {books.map((book,key) => (
                        <li key={key}><Link to={`/admin/books/${id}/chapters`}>{book.name}</Link></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

ListBooks.prototype = {}

export default ListBooks
