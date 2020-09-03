let express  = require('express')
const Category = require('../models/category')
// const Book     = require('../models/book')

const router = express.Router();

// get all
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({})
        res.json(categories)
    } catch (error) {
        res.json([])
    }
})

// Create new record
router.post('/create', async (req, res) => {
    try {
        const newCategory = new Category(req.body)
        const saveCategory = await newCategory.save()
        res.json(saveCategory)
    } catch (error) {
        res.json({message: error})
    }
})

// Update record
router.put('/update/:id', async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.json(updateCategory)
    } catch (error) {
        res.json({message: error})
    }
})

// Find one record
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.json(category)
    } catch (error) {
        res.json(null)
    }
})

// Delete
router.delete('/delete/:id', async (req, res) => {
    try {
        const removeCategory = Category.findOne(req.params.id)
        await Category.deleteOne({_id: req.params.id}).exec()
        res.json(removeCategory)
    } catch (error) {
        res.json({message: error})
    }
})

/*// Insert book/ api/category/${category_id}/book/add
router.patch('/:id/book/add', async (req, res) => {
    try {
        const {book_id} = await Category.findById(req.params.id)

        const newData = [
            ...book_id,
            req.body.lasted_id
        ]

        const response = await Category.findByIdAndUpdate(req.params.id, {book_id: newData})
        res.json(response)
    } catch (error) {
        res.json({message: error})
    }
})

// Remove book id relationship
router.patch('/:id/book/remove', async (req, res) => {
    try {
        const {book_id} = await Category.findById(req.params.id)

        const newData = book_id.filter(item => item !== req.body.book_remove )
        const response = await Category.findByIdAndUpdate(req.params.id, {book_id: newData})
        res.json(response)
    } catch (error) {
        res.json({message: error})
    }
})*/

module.exports = router



