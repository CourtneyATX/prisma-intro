const router = require('express').Router();
module.exports = router;

router.get('/', (req, res) => {
    //returns array of authors
});

router.post('/', (req, res) => {
    //creates a new author with info provided from request body
});

router.get('/:id', (req, res) => {
    //gets a single author with specified id
});

router.put('/:id', (req, res) => {
    //overwrites the author with info provided in req body
});

router.delete(':/id', (req, res) => {
    //deletes and author by a specified id
});

router.get(':id/books', (req, res) => {
    //gets all books by specified author
})

router.post(':id/books', (req, res) => {
    //creates a new book in the req body for specified author
});