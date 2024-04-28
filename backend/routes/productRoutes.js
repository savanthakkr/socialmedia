const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProducts,addPost,addComment,addlike,countLike,getPost, getCommentsByPostId} = productController;
const { verifyToken } = require("../middlewares/roleMiddleware");

// Create a new product
router.post('/createProducts',verifyToken, createProduct);

router.post('/addPost',verifyToken, addPost);


router.post('/addComment/:id',verifyToken, addComment);

router.post('/addlike',verifyToken, addlike);


router.get('/countLike/:id',verifyToken, countLike);

router.get('/comments/:id',verifyToken, getCommentsByPostId);

router.get('/getPost',verifyToken, getPost);

// Get all products
router.get('/products',verifyToken, getAllProducts);

// Get a specific product by ID
router.get('/productById/:id',verifyToken, getProductById);

// Update a product 
router.put('/updateProduct/:id',verifyToken, updateProduct);

// Delete a product
router.delete('/deleteProducts/:id',verifyToken, deleteProduct);

// Search products
router.get('/search',verifyToken, searchProducts);

module.exports = router;
