const express = require('express')
const Book = require('../models/book')
const Chapter = require('../models/chapter')

const router = express.Router()

// Get all
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        res.json(books)
    } catch (error) {
        res.json({message: error})
    }
})

// Find book
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json(book)
    } catch (error) {
        res.json({})
    }
})

// Create new record
router.post('/create', async (req, res) => {
    try {
        const newBook = new Book(req.body)
        await newBook.save()
        res.json({lasted_id: newBook._id})
    } catch (error) {
        res.json({message: error})
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body)
        res.json(updateBook)
    } catch (error) {
        res.json({message: error})
    }
})

// Delete
router.delete('/delete/:id', async (req, res) => {
    try {
        const removeBook = await Book.deleteOne({_id: req.params.id}).exec()
        res.json(removeBook)
    } catch (error) {
        res.json(error)
    }
})

// Get chapters
router.get('/:id/chapters', async (req, res) => {
    try {
        const {chapter_id} = await Book.findById(req.params.id)
        const chapters = await Chapter.find({_id: {$in: chapter_id}})
        res.json(chapters)
    } catch (error) {
        res.json([])
    }
})

// Insert chapter/ api/books/${book_id}/chapter/add
router.patch('/:id/chapter/add', async (req, res) => {
    try {
        const {chapter_id} = await Book.findById(req.params.id)

        const newData = [
            ...chapter_id,
            req.body.lasted_id
        ]

        const response = await Book.findByIdAndUpdate(req.params.id, {chapter_id: newData})
        res.json(response)
    } catch (error) {
        res.json({message: error})
    }
})

// Remove relationship
router.patch('/:id/chapter/remove', async (req, res) => {
    try {
        const {chapter_id} = await Book.findById(req.params.id)
        const newData = chapter_id.filter(item => item !== req.body.chapter_remove)
        const response = await Book.findByIdAndUpdate(req.params.id, {chapter_id: newData})
        res.json(response)
    } catch (error) {
        res.json({message: error})
    }
})

module.exports = router
