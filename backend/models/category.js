const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});
/*CategorySchema.virtual('books', {
    ref: 'books',
    localField: '_id',
    foreignField: 'book_id'
})*/

const Category = mongoose.model('categories', CategorySchema)
CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });

module.exports = Category