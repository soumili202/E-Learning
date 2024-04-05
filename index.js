const express = require('express');
const connect = require('./connect');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

connect();

app.listen(port, () => {

    console.log(`Example app listening at http://localhost:${port}`);
    }
);






