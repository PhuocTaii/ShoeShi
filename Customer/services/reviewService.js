const Review = require('../models/review')
const User = require('../models/customer')

const reviewService = {
  getAllReviews() {
    const reviews = Review.find()
    return reviews
  },

  addReview(review, product) {
    const newReview = new Review({
        product: product,
        reviewer: review.reviewer,
        rating: review.rating,
        tittle: review.tittle,
        content: review.content,
    })
    newReview.save()
    return newReview
  },
}

module.exports = reviewService
