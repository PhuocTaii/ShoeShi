const reviewController = require('../controllers/reviewController');
const { isAuth } = require('../middleware/authenticationMiddleware');
const router = require('express').Router();

//GET all reviews
router.get('/', reviewController.getAllReviews);

//ADD 1 review
router.post('/:id', isAuth, reviewController.addReview);

//GET all reviews by product
router.get('/:id', reviewController.getReviewByProduct);

module.exports = router