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
            const savedReview = await reviewService.addReview(req.body, req.params.id, req.user.id)
            const reviews = await reviewService.getReviewByProduct(1, req.params.id)

            const totalReviews = await reviewService.getTotalReviewsByProduct(req.params.id)
            const totalPages = Math.ceil(totalReviews / reviewService.reviewsPerPage)

            res.status(200).json({
              reviews,
              totalReviews,
              totalPages,
              activePage: 1,
            })
        } catch (err) {
          res.status(500).json(err)
        }
    },

    getReviewByProduct: async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1
        const reviews = await reviewService.getReviewByProduct(page, req.params.id)
        const formattedReviews = reviewService.formatReviewTime(reviews)
        
        const totalReviews = await reviewService.getTotalReviewsByProduct(req.params.id)
        const totalPages = Math.ceil(totalReviews / reviewService.reviewsPerPage)

        res.status(200).json({
          reviews: formattedReviews,
          totalReviews,
          totalPages,
          activePage: page,
        })
      } catch (err) {
        res.status(500).json(err)
      }
    }
}

module.exports = reviewController
