const express = require('express')
const Book = require('../models/book')
// const Chapter = require('../models/chapter')

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

// Get by category
router.get('/category/:id', async (req, res) => {
    try {
        const books = await Book.find({category_id: req.params.id})
        res.json(books)
    } catch (error) {
        res.json(null)
    }
})

// Find book
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json(book)
    } catch (error) {
        res.json(null)
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

module.exports = router
