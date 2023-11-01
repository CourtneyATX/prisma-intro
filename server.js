const express = require("express");
const app = express();

const PORT = 3000;

//body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//api routes
app.use("/api", require("./api"));

//error handling
app.use((err, req, res, next) => {
    const status = error.status ?? 500;
    const message = err.message ?? 'Internal server error.';
    res.status(status).json({ message });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});