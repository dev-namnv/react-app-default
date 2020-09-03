let express = require('express')
const Chapter = require('../models/chapter')

const router = express.Router()

router.get('/book/:id', async (req, res) => {
    try {
        const chapters = await Chapter.find({book_id: req.params.id})
        res.json(chapters)
    } catch (error) {
        res.json(null)
    }

})

// Get a record
router.get('/:id', async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id)
        res.json(chapter)
    } catch (error) {
        res.json(null)
    }
})

// Create a record
router.post('/create', async (req, res) => {
    try {
        const newRecord = new Chapter(req.body)
        await newRecord.save()
        res.json({lasted_id: newRecord._id})
    } catch (error) {
        res.json({message: 'fail'})
    }
})

// Update chapter
router.put('/update/:id', async (req, res) => {
    try {
        const responseUpdate = Chapter.findByIdAndUpdate(req.params.id, req.body).exec()
        res.json(responseUpdate)
    } catch (error) {
        res.json({message: error})
    }
})

// Remove item
router.delete('/delete/:id', async (req, res) => {
    try {
        const response = Chapter.findByIdAndRemove(req.params.id).exec()
        res.json(response)
    } catch (error) {
        res.json({message: error})
    }
})

module.exports = router