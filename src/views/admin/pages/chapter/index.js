import React, {useState, useEffect} from 'react'
import * as Toastr from "toastr"
import 'toastr/build/toastr.min.css'

import BookApi from '../../../../api/book'
import ChapterApi from '../../../../api/chapter'
import {Link, useParams} from "react-router-dom";
import $ from "jquery";

const ChapterManager = () => {
    const {id} = useParams()
    const [chapters, setChapters] = useState([])
    const [book, setBook] = useState({})

    // Get data
    useEffect(() => {
        $("html, body").stop().animate({scrollTop: 0}, 300, 'swing');
        const getChapters = async () => {
            return await ChapterApi.getByBook(id)
        }
        const getBook = async () => {
            return await BookApi.find(id)
        }
        getChapters().then(({data}) => setChapters(data))
        getBook().then(({data}) => setBook(data))
    }, [id])

    // Remove record
    const onHandleRemove = id => {
        $('.spinner-border').show()
        const removeChapter = async () => {
            return await ChapterApi.remove(id)
        }
        removeChapter().then(({status}) => {
            $('.spinner-border').hide()
            status === 200 ? Toastr.info('Successfully', 'Deleted!') : Toastr.error('An error occurred. Please try again later', 'Error!')
        })

        const newChapter = chapters.filter(cate => cate._id !== id)
        setChapters(newChapter)
    }

    return (
        <div className="m-lg-2">
            {/* Page Heading */}
            <h1 className="h3 mb-2 text-gray-800 ml-lg-3">Tables</h1>
            <p className="mb-4 ml-lg-3">DataTables is a third party plugin that is used to generate the demo table
                below. For more information about DataTables, please visit the.</p>
            {/* DataTales Example */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">{book !== null ? 'Data Chapters for ' + book.name : 'Cant found book'}</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            {chapters.map(({_id, name}, key) => (
                                <tr key={key}>
                                    <td>#{_id}</td>
                                    <td className="btn-link"><Link to={`/admin/chapter/${_id}`}>{name}</Link></td>
                                    <td className="align-content-center">
                                        <Link className="btn btn-info" to={`/admin/chapter/${_id}`}><i className="fas fa-edit" /></Link>
                                        <button className="btn btn-danger ml-lg-3" onClick={() => { if (window.confirm('Delete this item ?')) onHandleRemove(_id) }}><i className="fas fa-trash-alt" /></button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

ChapterManager.propTypes = {}

export default ChapterManager
