const express = require('express');
const authorsController = require('../controllers/authors.contoller');
const router = express.Router();

// GET 
router.get('/', authorsController.getAuthors);

// POST
router.post('/', authorsController.createAuthor);

// PUT
router.put('/', authorsController.updateAuthor);

// DELETE
router.delete('/', authorsController.deleteAuthor);

module.exports = router;