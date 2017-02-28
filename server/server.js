const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8000;

const oneDay = 86400000;
app.use(express.static(path.join(__dirname, '..', '/public')));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});