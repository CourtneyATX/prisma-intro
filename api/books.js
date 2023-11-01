const router = require('express').Router();
module.exports = router;

router.get('/', (req, res) => {
    // returns array of all books
});

router.get('/:id', (req, res) => {
    // returns single book with specified id
});

router.put('/:id', (req, res) => {
    // overwrites a book with info from req body
});

router.delete(':/id', (req, res) => {
    // deletes book with specified id
})