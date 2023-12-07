const reviewController = require('../controllers/reviewController');
const router = require('express').Router();

//GET all reviews
router.get('/reviews', reviewController.getAllReviews);

//ADD 1 review
router.post('/review/:id', reviewController.addReview);

module.exports = router