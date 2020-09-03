import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import BookApi from '../../../../api/book'
import ChapterApi from '../../../../api/chapter'
import Pagination from "react-js-pagination";
import $ from "jquery";
// import chapter from "../../../../api/chapter";

const BookChapters = () => {
    const History = useHistory()
    const {id, chapter_id} = useParams()
    const [book, setBook] = useState(null)
    const [chapters, setChapters] = useState([])
    const [reading, setReading] = useState(null)
    useEffect(() => {
        $("html, body").stop().animate({scrollTop: 0}, 300, 'swing');
        const getBook = async () => {
            return await BookApi.find(id)
        }

        const getChapters = async () => {
            return  await ChapterApi.getByBook(id)
        }

        const checkReadingChap = () => {
            const chapterCurrent = JSON.parse(localStorage.getItem('book_reading'))
            if (chapterCurrent !== null) {
                chapterCurrent.forEach(item => {
                    if (item.book_id === id && chapter_id === undefined) {
                        let confirm = window.confirm('Bạn đang đọc dở truyện này, bạn có muốn tiếp tục đọc phần trước ?')
                        if (confirm === true) {
                            History.push(`/book/${id}/chapter/${item.chapter_id}`)
                        }
                    }
                })
            }
        }

        const getChapterReading = async () => {
            return await ChapterApi.find(chapter_id)
        }

        getBook().then(({data}) => setBook(data))
        getChapters().then(({data}) => setChapters(data))
        checkReadingChap()
        getChapterReading().then(({data}) => setReading(data))
    }, [id, chapter_id])

    const handlePageChange = (pageNumber) => {
        let bookReading = JSON.parse(localStorage.getItem('book_reading'))
        const dataFilter = chapters.filter((item, key) => pageNumber === key+1)
        const current = dataFilter[0]

        History.push(`/book/${id}/chapter/${current.id}`)

        // if (chapterCurrent === null || chapterCurrent === undefined)
        if (bookReading === null) {
            let newData = [{book_id: current.book_id, chapter_id: current.id}]
            localStorage.setItem('book_reading', JSON.stringify(newData))
            console.log('add 1 record to localstorage', newData)
        } else {
            let hasItem = false
            bookReading.forEach(item => {
                if (item.book_id === book.id) hasItem = true
            })

            if (hasItem) {
                bookReading.forEach(item => {
                    if (item.book_id === book.id) {
                        item.chapter_id = current.id
                    }
                })
            } else {
                bookReading = [
                    ...bookReading,
                    {book_id: book.id, chapter_id: current.id}
                ]
            }
            localStorage.setItem('book_reading', JSON.stringify(bookReading))

        }
    }
    console.log(reading)
    return (
        <div className="container row">
            <div className="col-lg-3">
                <section className="pb-lg-3">
                    <h1>{book !== null ? book.name : 'Cant found book'}</h1>
                    <img src={book !== null ? book.feature_image : ""} style={{maxHeight: "200px"}} alt=""/>
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
            <div className="col-8 mt-3 ml-1">
                <h2><strong>{reading !== null && book !== null ? reading.name : 'Cant found chapter'}</strong></h2>
                <div dangerouslySetInnerHTML={{__html: reading !== null && book !== null ? reading.content : ''}}></div>
            </div>
        </div>
    )
}

BookChapters.prototype = {}

export default BookChapters