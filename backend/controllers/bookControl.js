const Book = require('../models/book');

exports.bookProp = async (req, res) => {
   const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Unable to book property', 
        })
    }

    const book = new Book(body)

    if (!book) {
        return res.status(400).json({ success: false, error: err })
    }

    book
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: book._id,
                message: 'Place Booking success',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Place not booked!',
            })
        })
};
