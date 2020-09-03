import React, {useEffect, useState} from "react";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import {useForm} from "react-hook-form";
import {useHistory, useParams} from 'react-router-dom';
import ChapterApi from '../../../../api/chapter';
import BookApi from '../../../../api/book';
import * as Toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import $ from 'jquery'

const ChapterForm = () => {
    const History = useHistory()
    const {id, book_id} = useParams()
    const [validBook, setValidBook] = useState(null)
    const [defaultValue, setDefaultValue] = useState(null)
    const [content, setContent] = useState()

    useEffect(() => {
        // Scroll to top
        $("html, body").stop().animate({scrollTop: 0}, 300, 'swing');

        // get book id valid
        const getBookIdValid = async () => {
            return await BookApi.find(book_id)
        }
        getBookIdValid().then(({data}) => setValidBook(data))

        // get chapter edit
        const getChapterEdit = async () => {
            return await ChapterApi.find(id)
        }
        getChapterEdit().then(({data}) => {
            setDefaultValue(data)
            if (data !== null) {
                setContent(data.content)
            }
        })
    }, [book_id, id])

    const { register, handleSubmit, errors } = useForm();
    const onChangeContent = (content) => {
        setContent(content)
    }
    // Submit
    const onHandleSubmit = data => {
        $('.spinner-border').show()
        const newData = {
            ...data,
            content
        }
        console.log('New data: ', newData)
        if (validBook !== null) { // if Valid book
            newData.book_id = validBook._id
            ChapterApi.create(newData).then(({status, data}) => {
                $('.spinner-border').hide()
                if (status === 200) {
                    Toastr.success('Created new record','Success')
                    History.push('/admin/books')
                } else {
                    Toastr.error('Error white create new record', 'Error')
                }
            })
        } else if(defaultValue !== null && id !== undefined) { // If valid chapter
            // Update
            newData.book_id = defaultValue.book_id
            ChapterApi.update(id, newData).then(({status}) => {
                $('.spinner-border').hide()
                if (status === 200) {
                    Toastr.success('Updated record','Success')
                    History.push('/admin/books')
                } else {
                    Toastr.error('Error white update record', 'Error')
                }
            })
        } else { // Invalid
            $('.spinner-border').hide()
            Toastr.error('Book id is invalid!', 'Error')
        }
    }

    const title = () => {
        if (validBook !== null) {
            return 'Add chapter for ' + validBook.name
        } else if (defaultValue !== null) {
            return 'Edit ' + defaultValue.name
        } else {
            return 'Cant found book'
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="card-body">
                <h2>{title()}</h2>
            </div>
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
                        initialValue={defaultValue !== null ? defaultValue.content : ''}
                        init={{
                            height: 1000,
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
                        onEditorChange={onChangeContent}
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

ChapterForm.prototype = {}

export default ChapterForm