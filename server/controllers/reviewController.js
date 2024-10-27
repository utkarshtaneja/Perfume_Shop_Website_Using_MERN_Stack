const Review = require('../models/Review');

exports.addReview = async (req, res) => {
    try {
        const { username, comment, rating } = req.body;
        const productId = req.params.id;

        const review = new Review({
            productId,
            username,
            comment,
            rating
        });

        await review.save();

        res.json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
};

exports.deleteReview = async (req, res) => {
    
}