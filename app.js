const express = require('express');

const app = express();
const port = process.env.PORT;

app.listen(() => console.log(`server listening on port: ${port}`));