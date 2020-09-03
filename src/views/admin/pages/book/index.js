import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import BookApi from '../../../../api/book'
import CategoryApi from '../../../../api/category'
import * as Toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import $ from "jquery";

const BookManager = () => {
    const {cate_id} = useParams()
    const [books, setBooks] = useState([])
    const [category, setCategory] = useState(null)

    // Fetch data
    useEffect(() => {
        $("html, body").stop().animate({scrollTop: 0}, 300, 'swing');

        // Get category if isset cate_id
        const getCategory = async () => {
            return await CategoryApi.find(cate_id)
        }

        // get books
        const getBooks = async () => {
            if (cate_id !== undefined) {
                return await BookApi.getByCategory(cate_id)
            } else {
                return await BookApi.all()
            }
        }
        getBooks().then(({data}) => setBooks(data))
        getCategory().then(({data}) => setCategory(data))
    }, [cate_id])

    // Remove record
    const onHandleRemove = id => {
        const removeBook = async () => {
            return await BookApi.remove(id)
        }
        const newBooks = books.filter(book => book._id !== id)
        setBooks(newBooks)
        removeBook().then(({status}) => status === 200 ? Toastr.success('Delete book successfully') : Toastr.error('Error while remove book'))
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

                    <h6 className="m-0 font-weight-bold text-primary">{category !== null && cate_id !== undefined ? `Data books for ${category.name}` : 'Data books' }</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Buy only</th>
                                <th>Active</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Buy only</th>
                                <th>Active</th>
                                <th>Action</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            {books.map(({id, name, feature_image, price, quantity, buy_only, is_active}, key) => (
                                <tr key={key}>
                                    <td><Link to={`/admin/book/${id}/chapters`}>{name}</Link></td>
                                    <td><img style={{maxHeight: 100}} src={feature_image} alt=""/></td>
                                    <td>{price}</td>
                                    <td>{quantity}</td>
                                    <td>{buy_only ? <small className="badge badge-success">Buy open</small> : <small className="badge badge-dark">Buy close</small>}</td>
                                    <td>{is_active ? <small className="badge badge-success">Active</small> : <small className="badge badge-dark">Block</small>}</td>
                                    <td className="align-content-center">
                                        <Link className="btn btn-primary" to={`/admin/book/${id}/chapter/add`}><i className="far fa-plus-square" /></Link>
                                        <Link className="btn btn-info ml-lg-3" to={`/admin/book/edit/${id}`}><i className="fas fa-edit" /></Link>
                                        <button className="btn btn-danger ml-lg-3" onClick={() => { if (window.confirm('Delete this item ?')) onHandleRemove(id) }}><i className="fas fa-trash-alt" /></button>
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

BookManager.prototype = {}

export default BookManager