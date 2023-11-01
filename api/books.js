const router = require('express').Router();
module.exports = router;

const prisma = require('../prisma');

    // returns array of all books
router.get('/', async (req, res, next) => {
    try {
        const books = await prisma.book.findMany();
        res.json(books);
    } catch {
        next();
    }
});

    // returns single book with specified id
router.get('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id;
        const book = await prisma.book.findUnique({ where: { id }});
        
        if (!book) {
            return next({
                status: 404, 
                message: `Could not find books by id ${id}.`
            });
        }
        res.json(book);
    } catch {
        next();
    }
});

    // overwrites a book with info from req body
router.put('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id;

        const bookExists = await prisma.book.findUnique({ where: { id }});

        if (!bookExists) {
            return next({
                status: 404, 
                message: `No book exists with id ${id}`,
            });
        }

        const { title, authorId } = req.body;
        if (!title) {
            return next({
                status: 400, 
                message: `Book must have a title.`,
            });
        } else if (!authorId) {
            return next({
                status: 400, 
                message: `Book must have an authorId.`,
            });
        }

        const book = await prisma.book.update({
            where: { id }, 
            data: { title, authorId },
        });

        res.json(book);
    } catch {
        next();
    }
});

    // deletes book with specified id
router.delete(':/id', async (req, res, next) => {
    try {
        const id = +req.params.id;

        const bookExists = await prisma.book.findUnique({ where: { id }});

        if (!bookExists) {
            return next({
                status: 404, 
                message: `No book exists with id ${id}`,
            });
        }
        
        await prisma.book.delete({ where: { id }});

        res.sendStatus(204);
    } catch {
        next();
    }
});