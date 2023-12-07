const reviewService = require('../services/reviewService');

const reviewController = {
    //GET all reviews
    getAllReviews: async (req, res) => {
        try {
          const reviews = await reviewService.getAllReviews()
          res.status(200).json(reviews)
        } catch (err) {
          res.status(500).json(err)
        }
    },
    //ADD 1 review
    addReview: async (req, res) => {
        try {
            const savedReview = await reviewService.addReview(req.body, req.params.id)
            res.status(200).json(savedReview)
        } catch (err) {
          res.status(500).json(err)
          console.log(err)
        }
    },
}

module.exports = reviewController
