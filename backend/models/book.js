const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    feature_image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    buy_only: {
        type: Boolean,
        required: true,
        default: 1
    },
    is_active: {
        type: Boolean,
        required: true,
        default: 1
    },
    category_id: {
        type: String,
        required: true,
        default: null
    }
}, {
    timestamps: true,
});

const Book = mongoose.model('books', BookSchema)
BookSchema.set('toObject', { virtuals: true });
BookSchema.set('toJSON', { virtuals: true });

module.exports = Book