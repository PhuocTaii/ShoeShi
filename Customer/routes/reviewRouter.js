const reviewController = require('../controllers/reviewController');
const router = require('express').Router();

//GET all reviews
router.get('/', reviewController.getAllReviews);

router.get('/:id', reviewController.getReviewByProduct);

//ADD 1 review
router.post('/:id', reviewController.addReview);

module.exports = router