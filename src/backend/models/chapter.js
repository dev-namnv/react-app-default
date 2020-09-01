const mongoose = require('mongoose')

const ChapterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Chapter = mongoose.model('chapters', ChapterSchema)

ChapterSchema.set('toObject', { virtuals: true });
ChapterSchema.set('toJSON', { virtuals: true });

module.exports = Chapter