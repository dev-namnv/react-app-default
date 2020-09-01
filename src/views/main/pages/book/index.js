import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import BookApi from '../../../../api/book'
import Pagination from "react-js-pagination";

const BookChapters = () => {
    const {id} = useParams()
    const [book, setBook] = useState({})
    const [chapters, setChapters] = useState([])
    const [chapterCurrent, setChapterCurrent] = useState([])

    useEffect(() => {
        const getBook = async () => {
            return await BookApi.find(id)
        }
        const getChapters = async () => {
            return  await BookApi.getChapters(id)
        }
        const getChapterCurrent = () => {
            setChapterCurrent(JSON.parse(localStorage.getItem('book_reading')))
        }

        getChapterCurrent()
        getBook().then(({data}) => setBook(data))
        getChapters().then(({data}) => setChapters(data))
    }, [id, chapterCurrent])
    // console.log(chapterCurrent)

    const handlePageChange = (pageNumber) => {
        let newData = []
        const current = chapters.filter((item, key) => pageNumber === key+1)
        if (chapterCurrent === null) {
            newData = [{book_id: book._id, chapter_id: current._id}]
        } else {
            newData = [
                ...chapterCurrent,
                {book_id: book._id, chapter_id: current._id}
            ]
        }
        localStorage.setItem('book_reading', JSON.stringify(newData))
    }

    return (
        <div className="container">
            <section className="pb-lg-3">
                <h1>{'Read: ' + book.name ?? 'Cant found book'}</h1>
                <img src={book.feature_image} style={{maxHeight: "200px"}} alt=""/>
            </section>

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <Pagination
                        itemsCountPerPage={1}
                        totalItemsCount={chapters.length}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                        itemClass={'page-item'}
                        activeClass="active"
                        linkClass="page-link"
                        activeLinkClass="active"
                    />
                </ul>
            </nav>
        </div>
    )
}

BookChapters.prototype = {}

export default BookChapters