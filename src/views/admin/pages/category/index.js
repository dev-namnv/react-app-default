import React, {useState, useEffect} from 'react'
import * as Toastr from "toastr"
import 'toastr/build/toastr.min.css'

import CategoryApi from '../../../../api/category'
import {Link} from "react-router-dom";
import $ from "jquery";

const CategoryManager = props => {
    const [categories, setCategories] = useState([])

    // Get data
    useEffect(() => {
        $("html, body").stop().animate({scrollTop: 0}, 300, 'swing');
        const getCategories = async () => {
            return await CategoryApi.all()
        }
        getCategories().then(({data}) => setCategories(data))
    }, [])

    // Remove record
    const onHandleRemove = id => {
        CategoryApi.remove(id).then(({status}) => {
            status === 200 ? Toastr.info('Successfully', 'Deleted!') : Toastr.error('An error occurred. Please try again later', 'Error!')
        })

        const newCategories = categories.filter(cate => cate._id !== id)
        setCategories(newCategories)
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
                    <h6 className="m-0 font-weight-bold text-primary">Data Categories</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Desc</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Desc</th>
                                <th>Action</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            {categories.map(({_id, name, description}, key) => (
                                <tr key={key}>
                                    <td>#{_id}</td>
                                    <td className="btn-link"><Link to={`/admin/category/${_id}/books`}>{name}</Link></td>
                                    <td dangerouslySetInnerHTML={{__html: description}} style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px", maxHeight: "50px"}}/>
                                    <td className="align-content-center">
                                        <Link className="btn btn-primary" to={`/admin/category/${_id}/book/add`}><i className="far fa-plus-square" /></Link>
                                        <Link className="btn btn-info ml-lg-3" to={`/admin/category/edit/${_id}`}><i className="fas fa-edit" /></Link>
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

CategoryManager.propTypes = {}

export default CategoryManager
