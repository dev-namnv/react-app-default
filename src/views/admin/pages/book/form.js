import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory, useParams} from 'react-router-dom';
import Switch from 'react-switch'
import firebase from "../../../../firebase";

import BookApi from '../../../../api/book';
import CategoryApi from '../../../../api/category';
import * as Toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import $ from "jquery";

const BookForm = () => {
    const History = useHistory()
    const {id, cate_id} = useParams()
    const [category, setCategory] = useState(null)
    const [valueEdit, setValueEdit] = useState(null)
    let [buyOnly, setBuyOnly] = useState(valueEdit !== null ? valueEdit.buy_only : true)
    let [isActive, setIsActive] = useState(valueEdit !== null ? valueEdit.is_active : true)

    useEffect(() => {
        $("html, body").stop().animate({scrollTop: 0}, 300, 'swing');

        const getCategory = async () => {
            return await CategoryApi.find(cate_id)
        }

        const getBookEdit = async () => { // Get book edit
            return await BookApi.find(id)
        }
        getCategory().then(({data}) => setCategory(data))
        if (id !== undefined) getBookEdit().then(({data}) => setValueEdit(data))
    }, [id, cate_id])

    const {register, handleSubmit, errors} = useForm();

    // Switch
    const onChangeBuyOnly = checked => {
        setBuyOnly(checked)
    }
    const onChangeActive = checked => {
        setIsActive(checked)
    }

    // Submit
    const onHandleSubmit = data => {
        $('.spinner-border').show()
        // Get file input
        let file = data.feature_image[0]

        // Set data input
        let newData = {
            ...data,
            buy_only: buyOnly,
            is_active: isActive,
        }

        // Action
        if (category !== null) {
            newData.category_id = category._id
            if (file !== undefined) {
                $('input[type="file"]').addClass('invalid')
                let storageRef = firebase.storage().ref(`images/${file.name}`)
                storageRef.put(file).then(function () {
                    storageRef.getDownloadURL().then((url) => {
                        // Tạo object mới chứa toàn bộ thông tin từ input
                        newData.feature_image = url
                        // Post
                        console.log('Create new data', newData)
                        BookApi.create(newData).then(({status, data}) => { // Post and response
                            $('.spinner-border').hide()
                            if (status === 200) {
                                Toastr.success('Created new record', 'Success')
                                History.push('/admin/books')
                            } else {
                                Toastr.error('Error white create new record', 'Error')
                            }
                        })
                    })
                });
            } else {
                $('.spinner-border').hide()
                Toastr.warning('Please, choose file to upload!')
                $('input[type="file"]').addClass('is-invalid')
                return false
            }
        } else if (valueEdit !== null) {
            if (file !== undefined) { // If not put image firebase so get image from defaultValue
                let storageRef = firebase.storage().ref(`images/${file.name}`)
                storageRef.put(file).then(function () {
                    storageRef.getDownloadURL().then(url => {
                        newData.feature_image = url // Set url to feature image
                        console.log('Update a record with Image', newData)
                        BookApi.update(id, newData).then(data => { // Put update book
                            $('.spinner-border').hide()
                            if (data.status === 200) {
                                Toastr.success('Update record', 'Success')
                                History.push('/admin/books')
                            } else {
                                Toastr.error('Error white update record', 'Error')
                            }
                        })
                    })
                });
            } else {
                newData.feature_image = valueEdit.feature_image
                console.log('Update a record without Image', newData)
                BookApi.update(id, newData).then(data => { // Put update book
                    $('.spinner-border').hide()
                    if (data.status === 200) {
                        Toastr.success('Update record', 'Success')
                        History.push('/admin/books')
                    } else {
                        Toastr.error('Error white update record', 'Error')
                    }
                })
            }
        } else {
            Toastr.error('Category is invalid!', 'Error')
            $('.spinner-border').hide()
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="card-body">
                <h5>{category !== null ? 'Add book for ' + category.name : 'Category not found'}</h5>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Name <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={valueEdit !== null ? valueEdit.name : ''}
                        ref={register({required: true, minLength: 1})}
                        className={errors.name ? "form-control is-invalid" : "form-control"}
                        placeholder="Enter email"/>
                    {errors.name && <small className="form-text text-danger">Name is invalid</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="productPrice">Feature image</label>
                    <div className="input-group">
                        <div className="custom-file">
                            <input type="file"
                               className="custom-file-input"
                               id="inputGroupFile02"
                               name="feature_image"
                               aria-describedby="inputGroupFileAddon01"
                               ref={register}
                            />
                            <label className="custom-file-label" htmlFor="inputGroupFile02" aria-describedby="imageHelp">Choose image</label>
                        </div>
                    </div>
                </div>
                <img src={valueEdit !== null ? valueEdit.feature_image : ''} alt=""/>
                <div className="form-group">
                    <label>Price <span className="text-danger">*</span></label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={valueEdit !== null ? valueEdit.price : 0}
                        ref={register({required: true, min: 0})}
                        className={errors.price ? "form-control is-invalid" : "form-control"}
                        placeholder="Price"/>
                    {errors.price && <small className="form-text text-danger">Price is invalid</small>}
                </div>
                <div className="form-group">
                    <label>Quantity <span className="text-danger">*</span></label>
                    <input
                        type="number"
                        name="quantity"
                        defaultValue={valueEdit !== null ? valueEdit.quantity : 0}
                        ref={register({required: true, min: 0})}
                        className={errors.quantity ? "form-control is-invalid" : "form-control"}
                        placeholder="Quantity"/>
                    {errors.quantity && <small className="form-text text-danger">Quantity is invalid</small>}
                </div>
                <div className="form-group">
                    <div className="col-lg-6 row">
                        <label className="col-form-label col-3">Buy only</label>
                        <Switch className="col-3" onChange={onChangeBuyOnly} checked={buyOnly} />
                    </div>
                    <div className="col-lg-6 row">
                        <label className="col-form-label col-3">Active</label>
                        <Switch className="col-3" onChange={onChangeActive} checked={isActive} />
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                <button type="reset" className="btn btn-secondary">Cancel</button>
            </div>
        </form>
    )
}

BookForm.prototype = {}

export default BookForm