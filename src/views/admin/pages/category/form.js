import React, {useEffect, useState} from "react";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import {useForm} from "react-hook-form";
import {useHistory, useParams} from 'react-router-dom';
import CategoryApi from '../../../../api/category';
import * as Toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import $ from 'jquery'

const CategoryForm = () => {
    const History = useHistory()
    const {id} = useParams()
    const [defaultValue, setDefaultValue] = useState(null)

    useEffect(() => {
        $("html, body").stop().animate({scrollTop: 0}, 300, 'swing');
        const getCategoryEdit = async () => {
            return await CategoryApi.find(id)
        }
        getCategoryEdit().then(({data}) => setDefaultValue(data))
    }, [id])

    const { register, handleSubmit, errors } = useForm();

    let [description, setDescription] = useState()
    const onChangDesc = (content) => {
        setDescription(content)
    }
    // Submit
    const onHandleSubmit = data => {
        $('.spinner-border').show()
        const newData = {
            ...data,
            description
        }
        // console.log(newData)

        if (defaultValue !== {} && id !== undefined) {
            // Update
            CategoryApi.update(id, newData).then(({status}) => {
                $('.spinner-border').hide()
                if (status === 200) {
                    Toastr.success('Updated record','Success')
                    History.push('/admin/categories')
                } else {
                    Toastr.error('Error white update record', 'Error')
                }
            })
        } else {
            // Post
            CategoryApi.create(newData).then(({status}) => {
                $('.spinner-border').hide()
                if (status === 200) {
                    Toastr.success('Created new record','Success')
                    History.push('/admin/categories')
                } else {
                    Toastr.error('Error white create new record', 'Error')
                }
            })
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="card-body">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        name="name"
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter full name"
                        defaultValue={defaultValue !== null ? defaultValue.name : ''}
                        ref={register({
                            required: true,
                            minLength: 2
                        })}/>
                    {errors.name && <small className="form-text text-danger">Name is invalid</small>}
                </div>
                <div className="form-group">
                    <label>Subscription</label>
                    <Editor
                        value={defaultValue !== null ? defaultValue.description : ''}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                            // eslint-disable-next-line no-multi-str
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={onChangDesc}
                    />
                </div>
            </div>
            <div className="card-footer">
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                <button type="reset" className="btn btn-secondary">Cancel</button>
            </div>
        </form>
    )
}

CategoryForm.prototype = {}

export default CategoryForm