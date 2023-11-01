const router = require('express').Router();
module.exports = router;

const prisma = require('../prisma');

    //returns array of authors
router.get('/', async (req, res, next) => {
    try {
        const authors = await prisma.author.findMany();
        res.json(authors);
    } catch {
        next();
    }
});

    //creates a new author with info provided from request body
router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            const error = {
                status: 400,
                message: `Author must have a name.`,
            };

            return next(error);
        }
        const author = await prisma.author.create({ data: { name }});
            res.json(author);
    } catch {
        next();
    }
});

    //gets a single author with specified id
router.get('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id;
        const author = await prisma.author.findUnique({ where: { id }});

        if (!author) {
            return next({
                status: 404,
                message: `Could not find author with id ${id}.`,
            });
        }
        res.json(author);
    } catch {
        next();
    }
});

    //overwrites the author with info provided in req body
router.put('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id;

        const authExists = await prisma.author.findUnique({ where: { id }});

        if (!authExists) {
            return next({
                status: 404,
                message: `No author with id ${id} exists.`,
            });
        }

        const { name } = req.body;
        if (!name) {
            return next({
                status: 400, 
                message: `Author must have a name.`,
            });
        }

        const author = await prisma.author.update({
            where: { id },
            data: { name },
        });

        res.json(author);
    } catch {
        next();
    }
});

    //deletes and author by a specified id
router.delete(':/id', async (req, res, next) => {
    try {
        const id = +req.params.id;

        const authExists = await prisma.author.findUnique({ where: { id }});

        if (!authExists) {
            return next({
                status: 404,
                message: `No author with id ${id} exists.`,
            });
        };

        await prisma.author.delete({ where: { id }});

        res.sendStatus(204);
    } catch {
        next();
    }
});

    //gets all books by specified author
router.get(':id/books', async (req, res, next) => {
    try {
        id = +req.params.id;

        const author = await prisma.author.findUnique({ where: { id }});

        if (!author) {
            return next({
                status: 404, 
                message: `Could not find author with id ${id}.`,
            });
        }
        
        const books = await prisma.book.findMany({ where: {authorId: id }});

        res.json(books);
    } catch {
        next();
    }
});

    //creates a new book in the req body for specified author
router.post(':id/books', async (req, res, next) => {
    try {
        const id = +req.params.id;

        const author = await prisma.author.findUnique({ where: { id }});

        if (!author) {
            return next({
                status: 404, 
                message: `Could not find author with id ${id}.`,
            });
        }

        const { title } = req.body;

        if (!title) {
            return next( {
                status: 400,
                message: `Book must have a title.`,
            });
        }

        const book = await prisma.book.create({ 
            data: { title, author: { connect: { id }} }
        });

            res.json(book);
    } catch {
        next();
    }
});