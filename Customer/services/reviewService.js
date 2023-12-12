const Review = require('../models/review')

const reviewService = {
  reviewsPerPage: 2,

  getAllReviews() {
    const reviews = Review.find()
    return reviews
  },

  addReview(review, product, reviewer) {
    const newReview = new Review({...review, product, reviewer})
    return newReview.save()
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
        .lean()
    return reviews
  },

  formatReviewTime(reviews) {
    return reviews.map(review => {
      review.reviewTime = new Date(review.reviewTime).toLocaleString('en-GB');
      return review;
    });
  },

  getTotalReviewsByProduct(productId) {
    const count = Review.countDocuments({ product: productId });
    return count;
  },
}

module.exports = reviewService
