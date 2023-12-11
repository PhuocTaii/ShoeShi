const Review = require('../models/review')
const User = require('../models/customer')

const reviewService = {
  reviewsPerPage: 2,

  getAllReviews() {
    const reviews = Review.find()
    return reviews
  },

  addReview(review, product) {
    const newReview = new Review({
        product: product,
        reviewer: review.reviewer,
        rating: review.rating,
        title: review.title,
        content: review.content,
    })
    newReview.save()
    return newReview
  },

  getReviewByProduct(page, id) {
    page = page - 1
    const reviews = Review.find({product: id})
        .skip(page * reviewService.reviewsPerPage)
        .limit(reviewService.reviewsPerPage)
        .populate({
          path: 'reviewer',
          select: 'name',
        })
    return reviews
  },

  getTotalReviewsByProduct(productId) {
    const count = Review.countDocuments({ product: productId });
    return count;
  },
}

module.exports = reviewService
