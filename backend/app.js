// app.js

const express = require('express');
var cors = require('cors');

const app = express();

// CORS
app.use(cors({ origin: true, credentials: true }));

// Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
