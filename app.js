const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const taskRoutes = require('./task_routes');

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/healthcheck', (req, res) => {
  res.json({
    status: "I am healthy!!!!!!!!"
  });
});

app.use(taskRoutes);

app.listen(port, () => console.log(`server listening on port: ${port}`));
